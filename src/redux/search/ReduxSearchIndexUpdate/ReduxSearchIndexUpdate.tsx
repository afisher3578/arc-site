import React from "react";
import { useDispatch, useSelector } from "react-redux";

import * as searchActions from "redux/search/actions";
import { RootState } from "redux/store";
import { initSearch } from "search";

import { TableIdType } from "config/types";

export default function ReduxSearchIndexUpdate(props: { id: TableIdType, indexIds: string[], reduxCursor: string, children: React.ReactNode }) {
    const dispatch = useDispatch();
    const searchIndecesReducer = useSelector((state: RootState) => state.searchIndecesReducer);

    const [sessionUpdated, setSessionUpdated] = React.useState<boolean>(false);

    React.useEffect(() => {
        (async function () {
            if (!searchIndecesReducer[props.reduxCursor] || !sessionUpdated) {
                dispatch(searchActions.setSearchIndeces({ [props.reduxCursor]: { 
                    value: await initSearch(props.indexIds),
                    id: props.id
                } }));
                setSessionUpdated(true)
            }
        })()
    }, [sessionUpdated, searchIndecesReducer, dispatch, props.id, props.indexIds, props.reduxCursor])

    return <>{props.children}</>
}