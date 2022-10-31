import React from "react";

import { useARProvder } from "@/providers/ARProvider";

import { ArtifactTable } from "@/global/ArtifactTable";

import { LANGUAGE } from "@/language"
import * as S from "./styles";

export default function AccountAll() {
    const arProvider = useARProvder();

    const [data, setData] = React.useState<any>(null);
    const [state, setState] = React.useState<boolean>(false);

    React.useEffect(() => {
        (async function () {
            if (arProvider.walletAddress) {
                setData((await arProvider.getUserArtifacts(arProvider.walletAddress)));
            }
        })();
    }, [arProvider.walletAddress])

    function handleUpdateFetch() {
        setState(!state);
    }

    function getData() {
        if (data && data.contracts.length > 0) {
            return (
                <S.Wrapper>
                    <ArtifactTable 
                        data={data} 
                        showBookmarks={true}
                        handleUpdateFetch={handleUpdateFetch}
                    />
                </S.Wrapper>
            )
        }
        else {
            return <p>{LANGUAGE.noArtifacts}</p>
        }
    }

    return data ? (
        <>{getData()}</>
    ) : <p>{LANGUAGE.loading}&nbsp;...</p>
}