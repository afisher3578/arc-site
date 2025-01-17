import styled from 'styled-components';

import { open, fadeIn2 } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	height: 150px;
	width: 100%;
	@media (max-width: calc(${STYLING.cutoffs.initialWrapper} + 50px)) {
		height: auto;
	}
`;

export const Content = styled.div`
	height: 100%;
	width: 100%;
	max-width: ${STYLING.cutoffs.max};
	margin: calc(${STYLING.dimensions.navHeight} + 20px) auto 0 auto;
	padding: 0 30px 7.5px 30px;
	display: flex;
	align-items: center;
	animation: ${open} ${fadeIn2};
	background: ${(props) => props.theme.colors.container.alt3.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	box-shadow: 0 0 2.5px ${(props) => props.theme.colors.shadow.primary};
	@media (max-width: calc(${STYLING.cutoffs.initialWrapper} + 50px)) {
		flex-direction: column;
		align-items: start;
		padding: 20px;
	}
`;

export const HeaderWrapper = styled.div`
	height: 100%;
	width: 700px;
	display: flex;
	align-items: center;
	@media (max-width: calc(${STYLING.cutoffs.initialWrapper} + 50px)) {
		width: auto;
		margin: 0 0 20px 0;
	}
	@media (max-width: ${STYLING.cutoffs.secondary}) {
		margin: 0;
	}
`;

export const FlexHeader = styled.div`
	display: flex;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		flex-wrap: wrap;
	}
`;

export const H1 = styled.h1`
	font-size: 44px;
	line-height: 1.25;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		font-size: 40px;
	}
	@media (max-width: ${STYLING.cutoffs.secondary}) {
		font-size: 7.5vw;
	}
`;

export const Header1 = styled(H1)`
	color: ${(props) => props.theme.colors.font.primary.active.base};
	@media (max-width: ${STYLING.cutoffs.secondary}) {
		margin: 10px 0;
	}
`;

export const Header2Container = styled.div`
	width: fit-content;
	position: relative;
`;

export const Header2 = styled(Header1)`
	position: relative;
	z-index: 1;
	@media (max-width: ${STYLING.cutoffs.secondary}) {
		margin: 0;
	}
`;

export const Header3 = styled(H1)`
	color: ${(props) => props.theme.colors.font.primary.alt2};
`;

export const Highlight = styled.div`
	height: 24.5px;
	width: 100%;
	background: ${(props) => props.theme.colors.container.alt2.background};
	background: transparent;
	position: absolute;
	bottom: 0;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		height: 17.5px;
	}
`;

export const SubheaderWrapper = styled.div`
	height: 100%;
	width: calc(100% - 700px);
	min-width: 460px;
	display: flex;
	align-items: center;
	justify-content: end;
	@media (max-width: calc(${STYLING.cutoffs.initialWrapper} + 50px)) {
		width: auto;
		min-width: 0;
	}
`;

export const SubheaderContainer = styled.div``;

export const FlexSubheader = styled.div`
	display: flex;
	align-items: center;
	justify-content: end;
	@media (max-width: calc(${STYLING.cutoffs.initialWrapper} + 50px)) {
		justify-content: start;
	}
`;

export const Subheader1 = styled.p`
	font-size: 18px;
	color: ${(props) => props.theme.colors.font.primary.alt1};
	font-weight: ${(props) => props.theme.typography.weight.medium};
	@media (max-width: ${STYLING.cutoffs.secondary}) {
		font-size: ${(props) => props.theme.typography.size.xSmall};
	}
`;

export const Logo = styled.div`
	margin: 0 0 0 7.5px;
	svg {
		width: 100px;
	}
	@media (max-width: ${STYLING.cutoffs.secondary}) {
		margin: 0 0 0 5px;
		svg {
			width: 55px;
			padding: 2.5px 0 0 0;
		}
	}
`;

export const Subheader2 = styled.div`
	margin: 10px 0 0 auto;
	text-align: right;
	display: flex;
	align-items: center;
	justify-content: end;
	p {
		font-size: 17px;
		line-height: 1.5;
		color: ${(props) => props.theme.colors.font.primary.alt1};
		font-weight: ${(props) => props.theme.typography.weight.medium};
	}
	@media (max-width: calc(${STYLING.cutoffs.initialWrapper} + 50px)) {
		margin: 0;
		text-align: left;
		justify-content: start;
	}
	@media (max-width: ${STYLING.cutoffs.secondary}) {
		p {
			font-size: ${(props) => props.theme.typography.size.xSmall};
		}
	}
`;

export const Link = styled.div`
	width: fit-content;
	a {
		font-size: 17px;
		line-height: 1.5;
		color: ${(props) => props.theme.colors.font.primary.alt4};
		font-weight: ${(props) => props.theme.typography.weight.medium};
	}
	@media (max-width: calc(${STYLING.cutoffs.initialWrapper} + 50px)) {
		margin: 0;
		text-align: left;
	}
	@media (max-width: ${STYLING.cutoffs.secondary}) {
		a {
			font-size: ${(props) => props.theme.typography.size.xSmall};
		}
	}
`;
