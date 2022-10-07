import React from "react"
import { ReactSVG } from "react-svg";

import { useARProvder } from "@/providers/ARProvider";

import { Button } from "@/components/atoms/Button";
import { FormField } from "@/components/atoms/FormField";
import { Modal } from "@/components/molecules/Modal"

import { ASSETS } from "@/config";
import { LANGUAGE } from "@/language";
import { IProps } from "./types";
import * as S from "./styles";

export default function CollectionContribute(props: IProps) {
    const arProvider = useARProvder();

    const [showModal, setShowModal] = React.useState(true);
    const [amount, setAmount] = React.useState<number>(0);
    const [loading, setLoading] = React.useState<boolean>(false);

    async function handlePoolContribute() {
        setLoading(true);
        await arProvider.handlePoolContribute(props.poolId, amount)
        setLoading(false);
    }

    function getAvailableBalance() {
        if (arProvider.availableBalance) {
            return (
                <S.BalanceWrapper>
                    <S.AvailableBalance>{LANGUAGE.availableBalance}:&nbsp;</S.AvailableBalance>
                    <S.BalanceAmount>{arProvider.availableBalance.toFixed(3)}&nbsp;</S.BalanceAmount>
                    <S.ARTokens>{LANGUAGE.arTokens}</S.ARTokens>
                </S.BalanceWrapper>
            )
        }
        else {
            return (
                <S.BalanceWrapper>
                    <p>Fetching balance ...</p>
                </S.BalanceWrapper>
            )
        }
    }

    return (
        <>
            {showModal &&
                <Modal
                    title={LANGUAGE.contributeTo}
                    handleClose={() => setShowModal(false)}
                >
                    <S.ModalWrapper>
                        <S.Header>
                            <S.HeaderFlex>
                                <S.Header1>{props.header}</S.Header1>
                            </S.HeaderFlex>
                            {props.subheader}
                        </S.Header>
                        {getAvailableBalance()}
                        <S.FormField>
                            <FormField
                                type={"number"}
                                value={amount}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(parseFloat(e.target.value))}
                                disabled={loading}
                                invalid={{ status: false, message: null }}
                                endText={LANGUAGE.arTokens}
                            />
                        </S.FormField>
                        <S.Button>
                            <Button
                                label={LANGUAGE.submit}
                                type={"secondary"}
                                handlePress={() => handlePoolContribute()}
                                disabled={loading}
                                loading={loading}
                            />
                        </S.Button>
                        <S.SignMessage>
                            <p>{LANGUAGE.walletSignMessage}</p>
                        </S.SignMessage>
                    </S.ModalWrapper>
                </Modal>
            }
            <S.Wrapper
                onClick={() => setShowModal(true)}
            >
                <S.Label>
                    <ReactSVG src={ASSETS.logoAltActive} />
                    <span>{LANGUAGE.contribute}</span>
                </S.Label>
            </S.Wrapper>
        </>
    )
}