import styled from 'styled-components';

import { open, fadeIn1 } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div<{ top: number }>`
	min-height: 100vh;
	height: 100%;
	width: 100%;
	position: absolute;
	z-index: 11;
	top: ${(props) => `${props.top.toString()}px`};
	left: 0;
	background: ${(props) => props.theme.colors.overlay.primary};
	backdrop-filter: blur(2px);
	animation: ${open} ${fadeIn1};
`;

export const Container = styled.div<{ noHeader: boolean }>`
	height: 600px;
	max-height: calc(100vh - 100px);
	width: 600px;
	max-width: 87.5vw;
	background: ${(props) =>
		props.noHeader ? props.theme.colors.transparent : props.theme.colors.container.primary.background};
	border: 1px solid
		${(props) => (props.noHeader ? props.theme.colors.transparent : props.theme.colors.border.primary)};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	box-shadow: 0 0 2.5px
		${(props) => (props.noHeader ? props.theme.colors.transparent : props.theme.colors.shadow.primary)};
	margin: 50px auto;
	overflow-y: auto;
	scrollbar-width: none;
	::-webkit-scrollbar {
		width: 0px;
	}
	@media (max-width: ${STYLING.cutoffs.secondary}) {
		top: 50%;
	}
`;

export const Header = styled.div`
	height: 65px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 20px;
`;

export const LT = styled.div`
	display: flex;
	align-items: center;
`;

export const Logo = styled.div`
	margin: 0 20px 0 0;
	svg {
		width: 30px;
	}
`;

export const Title = styled.p`
	color: ${(props) => props.theme.colors.font.primary.alt1};
	font-family: ${(props) => props.theme.typography.family.primary};
	font-weight: ${(props) => props.theme.typography.weight.medium};
`;

export const Close = styled.div`
	padding: 2.5px 0 0 0;
`;

export const Body = styled.div`
	height: calc(100% - 65px);
	min-height: 500px;
	width: 100%;
`;

export const CloseTextContainer = styled.div`
	width: 600px;
	max-width: 87.5vw;
	display: flex;
	justify-content: end;
	align-items: center;
	position: absolute;
	top: 22.5px;
	left: 50%;
	transform: translate(-50%, 0);
`;

export const CloseButtonContainer = styled.button`
	color: ${(props) => props.theme.colors.warning};
	font-size: ${(props) => props.theme.typography.size.xxSmall};
	font-weight: ${(props) => props.theme.typography.weight.medium};
	&:hover {
		opacity: 0.75;
	}
`;
