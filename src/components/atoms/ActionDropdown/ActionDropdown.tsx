import React from 'react';

import { CloseHandler } from 'wrappers/CloseHandler';

import { IconButton } from 'components/atoms/IconButton';

import { ASSETS } from 'helpers/config';
import { IProps } from './types';
import * as S from './styles';

export default function ActionDropdown(props: IProps) {
	// const [openDown, setOpenDown] = React.useState<boolean>(true);
	const [showDropdown, setShowDropdown] = React.useState<boolean>(false);

	const dropdownHeight = 32.5 * props.actions.length + 10;

	const escFunction = React.useCallback((e: any) => {
		if (e.key === 'Escape' && showDropdown) {
			setShowDropdown(false);
		}
	}, [showDropdown]);

	React.useEffect(() => {
		document.addEventListener('keydown', escFunction, false);

		return () => {
			document.removeEventListener('keydown', escFunction, false);
		};
	}, [escFunction]);

	function handleCallback() {
		setShowDropdown(!showDropdown);
		props.handleCallback();
	}

	function handleShowDropdown(e: any) {
		// if (e) {
		// 	let m = window.innerHeight / 1.325;
		// 	if (e.clientY > m) {
		// 		setOpenDown(false);
		// 	} else {
		// 		setOpenDown(true);
		// 	}
		// }
		setShowDropdown(!showDropdown);
	}

	function runAction(action: () => void, closeOnAction: boolean) {
		action();
		if (closeOnAction) {
			setShowDropdown(false);
		}
	}

	return (
		<CloseHandler callback={() => handleCallback()} active={showDropdown}>
			<S.Wrapper>
				<IconButton type={'primary'} src={ASSETS.menuAction} handlePress={(e: any) => handleShowDropdown(e)} />
				{showDropdown && (
					<S.Dropdown openDown={true} height={dropdownHeight}>
						{props.actions.map((action, index) => {
							return (
								<S.Container key={index}>
									{action.subComponent && action.subComponent.active && action.subComponent.node}
									<S.LI disabled={action.disabled} onClick={() => runAction(action.fn, action.closeOnAction)}>
										{action.label}
									</S.LI>
								</S.Container>
							);
						})}
					</S.Dropdown>
				)}
			</S.Wrapper>
		</CloseHandler>
	);
}