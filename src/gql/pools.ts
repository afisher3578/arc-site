import { ArweaveClient } from "arweave-client";
import {
    GQLResponseType,
    PoolSearchIndexType,
    PoolType
} from "types";
import { getRedstoneSrcTxEndpoint } from "endpoints";
import { getGQLData } from "gql";
import { getTagValue } from "utils";
import { TAGS } from "config";

export async function getPoolIds() {
    const pools: GQLResponseType[] = await getGQLData({
        ids: null,
        tagFilters: [
            {
                name: TAGS.keys.appType,
                values: [
                    TAGS.values.poolVersions["1.2"],
                    TAGS.values.poolVersions["1.4"]
                ]
            }
        ],
        uploader: null,
        cursor: null,
        reduxCursor: null,
        cursorObject: null
    });

    return pools.map((pool: GQLResponseType) => {
        switch (getTagValue(pool.node.tags, TAGS.keys.appType)) {
            case TAGS.values.poolVersions["1.2"]:
                return pool.node.id;
            case TAGS.values.poolVersions["1.4"]:
                return getTagValue(pool.node.tags, TAGS.keys.uploaderTxId);
            default:
                return getTagValue(pool.node.tags, TAGS.keys.uploaderTxId);
        }
    });
}

export async function getPools(): Promise<PoolType[]> {
    const arClient = new ArweaveClient();

    const pools: PoolType[] = [];
    const poolIds = await getPoolIds();

    for (let i = 0; i < poolIds.length; i++) {
        if (poolIds[i]) {
            try {
                const contract = arClient.warp.contract(poolIds[i]).setEvaluationOptions({ allowBigInt: true });
                try {
                    pools.push({ id: poolIds[i], state: (await contract.readState() as any).cachedValue.state });
                }
                catch (error: any) {
                    console.error(error);
                }
            }
            catch (error: any) {
                console.error(error)
            }
        }
    }

    return pools;
}

export async function getPoolById(poolId: string): Promise<PoolType | null> {
    const arClient = new ArweaveClient();

    try {
        const contract = arClient.warp.contract(poolId).setEvaluationOptions({ allowBigInt: true });
        return { id: poolId, state: (await contract.readState() as any).cachedValue.state };
    }
    catch (error: any) {
        console.error(error)
        return null
    }
}

export async function getLatestPoolSearchIndexTxId(poolId: string) {
    const poolSearchIndexes: GQLResponseType[] = await getGQLData({
        ids: null,
        tagFilters: [
            {
                name: TAGS.keys.appType,
                values: [
                    TAGS.values.searchIndex
                ]
            },
            {
                name: TAGS.keys.alexPoolId,
                values: [
                    poolId
                ]
            }
        ],
        uploader: null,
        cursor: null,
        reduxCursor: null,
        cursorObject: null
    });

    if(poolSearchIndexes.length == 0) return null;

    if(poolSearchIndexes.length == 1) return poolSearchIndexes[0];

    let latestIndex = poolSearchIndexes[0];

    for(let i = 1; i < poolSearchIndexes.length; i++) {
        let thisIndex = poolSearchIndexes[i];
        let thisIndexDateTag = getTagValue(thisIndex.node.tags, TAGS.keys.timestamp);
        let latestIndexDateTag = getTagValue(latestIndex.node.tags, TAGS.keys.timestamp);
        let thisIndexDate = thisIndexDateTag ? parseInt(thisIndexDateTag) : 0;
        let latestIndexDate = latestIndexDateTag ? parseInt(thisIndexDateTag) : 0;
        if(thisIndexDate > latestIndexDate) {
            latestIndex = thisIndex;
        }
    }

    return latestIndex;
}

export async function getPoolSearchIndexById(poolSearchIndexId: string): Promise<PoolSearchIndexType | null> {
    const arClient = new ArweaveClient();

    try {
        const contract = arClient.warp.contract(poolSearchIndexId).setEvaluationOptions({ allowBigInt: true });
        return { id: poolSearchIndexId, state: (await contract.readState() as any).cachedValue.state };
    }
    catch (error: any) {
        console.error(error)
        return null
    }
}

export async function getPoolCount(nftContractSrc: string): Promise<number> {
    let redstoneContracts = await fetch(getRedstoneSrcTxEndpoint(nftContractSrc));
    let redstoneJson = await redstoneContracts.json();
    return parseInt(redstoneJson.paging.total);
}