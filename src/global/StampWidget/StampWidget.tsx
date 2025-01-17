import React from 'react';
import { ReactSVG } from 'react-svg';

import Stamps from '@permaweb/stampjs';

import { WalletBlock } from 'wallet/WalletBlock';

import { Loader } from 'components/atoms/Loader';
import { Button } from 'components/atoms/Button';
import { IconButton } from 'components/atoms/IconButton';
import { FormField } from 'components/atoms/FormField';
import { Notification } from 'components/atoms/Notification';

import { LANGUAGE } from 'helpers/language';
import { NotificationResponseType } from 'helpers/types';
import { IProps } from './types';
import { formatFloat } from 'helpers/utils';
import * as S from './styles';
import { ASSETS } from 'helpers/config';

function StampAction(props: { balance: number; handleSubmit: (amount: number) => void; handleClose: () => void }) {
	const [amount, setAmount] = React.useState<string>('0');

	const invalid = Number(amount) > props.balance;

	return (
		<S.SAContainer>
			<S.SAInfoContainer>
				<S.SABalanceContainer>
					<ReactSVG src={ASSETS.stamp.super} />
					<p>{formatFloat(props.balance, 2)}</p>
				</S.SABalanceContainer>
				<S.SACloseContainer>
					<IconButton type={'primary'} sm warning src={ASSETS.close} handlePress={props.handleClose} />
				</S.SACloseContainer>
			</S.SAInfoContainer>
			<S.SAFormContainer onSubmit={() => props.handleSubmit(Number(amount))}>
				<S.SAInput>
					<FormField
						type={'number'}
						value={amount}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
						disabled={false}
						invalid={{
							status: invalid,
							message: invalid ? LANGUAGE.amountExceedsBalance : null,
						}}
						sm
					/>
				</S.SAInput>
				<S.SASubmit>
					<Button
						type={'alt1'}
						label={'Submit'}
						handlePress={() => props.handleSubmit(Number(amount))}
						disabled={invalid || Number(amount) <= 0 || Number(amount) % 1 !== 0}
						formSubmit
						noMinWidth
					/>
				</S.SASubmit>
			</S.SAFormContainer>
		</S.SAContainer>
	);
}

export default function StampWidget(props: IProps) {
	const stamps = Stamps.init({ warp: props.warp });

	const [loading, setLoading] = React.useState<boolean>(true);
	const [count, setCount] = React.useState<{
		total: number;
		vouched: number;
		super: number;
	} | null>(null);
	const [updateCount, setUpdateCount] = React.useState<boolean>(false);
	const [balance, setBalance] = React.useState<number>(0);

	const [showWalletConnect, setShowWalletConnect] = React.useState<boolean>(false);
	const [showStampAction, setShowStampAction] = React.useState<boolean>(false);

	const [stampDisabled, setStampDisabled] = React.useState<boolean>(true);
	const [stampCheckLoading, setStampCheckLoading] = React.useState<boolean>(false);
	const [stampNotification, setStampNotification] = React.useState<NotificationResponseType | null>(null);

	React.useEffect(() => {
		if (!props.walletAddress && props.showWalletConnect) {
			setShowWalletConnect(true);
		}
	}, [props.walletAddress, props.showWalletConnect]);

	React.useEffect(() => {
		(async function () {
			if (props.walletAddress) {
				try {
					setBalance(await stamps.balance(props.walletAddress));
				} catch {}
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.walletAddress]);

	React.useEffect(() => {
		(async function () {
			if (props.txId) {
				try {
					setStampCheckLoading(true);
					setCount(await stamps.count(props.txId));
					setStampCheckLoading(false);
				} catch {}
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.txId, updateCount]);

	React.useEffect(() => {
		(async function () {
			if (props.txId) {
				setStampCheckLoading(true);
				const hasStamped = await stamps.hasStamped(props.walletAddress, props.txId);
				setStampCheckLoading(false);
				if (!hasStamped) {
					setStampDisabled(false);
				}
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.txId]);

	React.useEffect(() => {
		if (count && !stampCheckLoading) {
			setLoading(false);
		} else {
			setLoading(true);
		}
	}, [count, stampCheckLoading]);

	// (property) stamp: (transactionId: string, qty: number, tags: {
	// 	name: string;
	// 	value: string;
	// }[]) => Promise<any>

	const handleStamp = React.useCallback(
		async (amount?: number) => {
			if (props.txId) {
				setStampCheckLoading(true);
				let stamp: any;
				if (amount) {
					stamp = await stamps.stamp(props.txId, amount, [{ name: '', value: '' }]);
				} else {
					stamp = await stamps.stamp(props.txId, 0, [{ name: '', value: '' }]);
				}
				const stampSuccess = stamp && stamp.bundlrResponse && stamp.bundlrResponse.id;
				setStampCheckLoading(false);
				setStampDisabled(true);
				setUpdateCount(!updateCount);
				setStampNotification({
					status: stampSuccess ? 200 : 500,
					message: stampSuccess ? LANGUAGE.artifactStamped : LANGUAGE.errorOccurred,
				});
				props.handleStampCallback();
			}
		},
		[stamps, updateCount, props]
	);

	function handleStampCallback() {
		setStampNotification(null);
		props.handleStampCallback();
	}

	function handleStampAction(amount: number) {
		handleStamp(amount);
		setShowStampAction(false);
	}

	function getWidget() {
		if (showWalletConnect) {
			return (
				<S.WalletConnectWrapper>
					<WalletBlock />
				</S.WalletConnectWrapper>
			);
		} else {
			if (loading) {
				return (
					<S.LoadingContainer>
						<Loader xSm />
					</S.LoadingContainer>
				);
			} else {
				return (
					<>
						{showStampAction && (
							<StampAction
								balance={balance}
								handleClose={() => setShowStampAction(false)}
								handleSubmit={(amount: number) => handleStampAction(amount)}
							/>
						)}
						<S.WidgetContainer>
							<S.Action>
								<IconButton
									type={'alt1'}
									src={ASSETS.stamp.default}
									handlePress={() => handleStamp()}
									disabled={stampDisabled || stampCheckLoading || !props.walletAddress}
									info={count.total.toString()}
								/>
							</S.Action>
							<S.Action>
								<IconButton
									type={'alt1'}
									src={ASSETS.stamp.super}
									handlePress={() => setShowStampAction(!showStampAction)}
									disabled={
										balance <= 0 ||
										stampDisabled ||
										stampCheckLoading ||
										showStampAction ||
										!props.walletAddress
									}
									info={count.super.toString()}
								/>
							</S.Action>
							<S.Action>
								<IconButton
									type={'alt3'}
									src={ASSETS.stamp.vouched}
									handlePress={null}
									disabled={true}
									info={count.vouched.toString()}
								/>
							</S.Action>
						</S.WidgetContainer>
					</>
				);
			}
		}
	}

	return (
		<>
			{stampNotification && (
				<Notification
					message={stampNotification.message}
					type={stampNotification.status === 200 ? 'success' : 'warning'}
					callback={handleStampCallback}
				/>
			)}
			<S.Wrapper>{getWidget()}</S.Wrapper>
		</>
	);
}
