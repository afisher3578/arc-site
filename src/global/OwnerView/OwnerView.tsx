import React from "react";

import { ArtifactsDetail } from "global/ArtifactsDetail";
import { ArweaveClient } from "clients/arweave";

import { IProps } from "./types";

export default function OwnerView(props: IProps) {
    const arClient = new ArweaveClient();

    const [poolIds, setPoolIds] = React.useState<string[] | null>(null);

    React.useEffect(() => {
        (async function () {
            if(props.owner) {
                let contributions = await arClient.getUserContributions(props.owner);
                let ids = contributions.map((c) => {return c.id});
                setPoolIds(ids);
            }
        })();
    }, [props.owner])

    return (
        <ArtifactsDetail
            id={{ value: props.owner, type: "ownerId" }}
            indexIds={poolIds}
            cursorObject={props.cursorObject}
            defaultFetch={{
                fn: props.fetch,
                ids: null
            }}
            showCollections={props.showCollections}
            showPoolIds={props.showPoolIds}
            owner={props.owner}
            uploader={null}
        />
    )
}