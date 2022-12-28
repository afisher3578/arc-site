import React from "react";
import { ReactSVG } from "react-svg";

import { IconButton } from "components/atoms/IconButton";

import { ASSETS } from "config";
import { IProps } from "./types";
import * as S from "./styles";

export default function Search(props: IProps) {
    const [searchTerm, setSearchTerm] = React.useState<string>("");

    function handleSearch(e: React.KeyboardEvent<HTMLInputElement> | null) {
        if (!e) {
            setSearchTerm("");
            props.handleSearchFetch("");
        }
        else {
            if (e.key === "Enter") {
                props.handleSearchFetch(searchTerm)
            }
        }
    }

    return (
        <S.SearchWrapper>
            <S.SearchIcon>
                <ReactSVG src={ASSETS.search} />
            </S.SearchIcon>
            <S.SearchInput
                type={"text"}
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearch}
                placeholder={props.placeholder}
                disabled={props.disabled}
            />
            <S.CloseWrapper>
                <IconButton 
                    src={ASSETS.close}
                    type={"primary"}
                    handlePress={() => handleSearch(null)}
                    disabled={props.disabled || !searchTerm}
                    warning
                    sm
                />
            </S.CloseWrapper>
        </S.SearchWrapper>
    )
}