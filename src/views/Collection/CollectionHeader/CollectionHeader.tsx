import parse from "html-react-parser";

import { Button } from "@/components/atoms/Button";

import { CollectionContribute } from "../CollectionContribute";

import * as util from "@/util";
import { ASSETS } from "@/config";
import { LANGUAGE } from "@/language";
import { IProps } from "./types";
import * as S from "./styles";

export default function CollectionHeader(props: IProps) {

    function getSubheader() {
        return (
            <S.SubheaderFlex>
                    <S.SubheaderContainer>
                        <S.Subheader1><p>{LANGUAGE.collection.subheader1}</p></S.Subheader1>
                        &nbsp;
                        <S.ID><p>{util.formatAddress(props.id, false)}</p></S.ID>
                    </S.SubheaderContainer>
                    &nbsp;
                    <S.SubheaderContainer>
                        <S.Subheader1><p>{LANGUAGE.collection.createdOn}</p></S.Subheader1>
                        &nbsp;
                        <S.Subheader2><p>{util.formatDate(props.dateCreated)}</p></S.Subheader2>
                    </S.SubheaderContainer>
                </S.SubheaderFlex>
        )
    }

    return (
        <S.Wrapper>
            <S.Header>
                <S.HeaderFlex>
                    <S.Header1>{props.title}</S.Header1>
                    <Button
                        disabled
                        label={LANGUAGE.shareCollection}
                        type={"secondary"}
                        handlePress={() => console.log('Share collection')}
                        icon={ASSETS.share}
                    />
                </S.HeaderFlex>
                {getSubheader()}
            </S.Header>
            <S.Image image={props.image} />
            <S.FlexTiles>
                <S.Tile>
                    <S.TileTitle><p>{LANGUAGE.collection.totalContributed}</p></S.TileTitle>
                    <S.TileData>
                        <p>{props.totalContributions}</p>
                        <S.TContainer><p>{LANGUAGE.arTokens}</p></S.TContainer>
                    </S.TileData>
                </S.Tile>
                <S.Tile>
                    <S.TileTitle><p>{LANGUAGE.collection.artifactsCreated}</p></S.TileTitle>
                    <S.TileData>
                        <p>{props.artefactCount}</p>
                    </S.TileData>
                </S.Tile>
                <S.ContributeTile>
                    <CollectionContribute
                        poolId={props.id}
                        header={props.title}
                        subheader={getSubheader()}
                    />
                </S.ContributeTile>
            </S.FlexTiles>
            <S.LongDescription>
                <S.LDHeader><h2>{LANGUAGE.about}</h2></S.LDHeader>
                <S.LDBody>{parse(props.longDescription)}</S.LDBody>
            </S.LongDescription>
        </S.Wrapper>
    )
}