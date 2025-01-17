import styled from 'styled-components';

import { open, fadeIn2 } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	width: 100%;
`;

export const Content = styled.div`
	width: 100%;
	max-width: ${STYLING.cutoffs.max};
	margin: 40px auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	animation: ${open} ${fadeIn2};
`;

export const Header = styled.div`
	height: auto;
	width: 100%;
	margin: 0 auto 40px 0;
	display: flex;
	flex-direction: column;
	background: ${(props) => props.theme.colors.container.alt3.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	box-shadow: 0 0 2.5px ${(props) => props.theme.colors.shadow.primary};
	padding: 30px 20px;
	align-items: center;
	justify-content: center;
`;

export const H2 = styled.h2`
	font-size: 28px;
	line-height: 1.5;
	text-align: center;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		font-size: 24px;
	}
`;

export const Header1 = styled(H2)`
	color: ${(props) => props.theme.colors.font.primary.active.base};
	font-family: ${(props) => props.theme.typography.family.alt1};
`;

export const HeaderFlex = styled.div`
	display: flex;
	justify-content: center;
	margin: 5px 0;
	width: 67.5%;
	max-width: 1200px;
	text-align: center;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		width: 100%;
		padding: 0 20px;
		flex-direction: column;
	}
`;

export const Header2 = styled.p`
	font-size: 18px;
	line-height: 1.5;
	text-align: center;
	margin: 20px 0 0 0;
	color: ${(props) => props.theme.colors.font.primary.alt4};
	b {
		font-size: 18px;
		margin: 20px 0 0 0;
		color: ${(props) => props.theme.colors.font.primary.alt4};
	}
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		line-height: 1.5;
		margin: 20px 0 0 0;
	}
`;

export const Body = styled.div`
	height: 640px;
	width: 100%;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		flex-direction: column;
		height: auto;
	}
`;

export const InfoContainer = styled.div`
	height: 100%;
	width: 51.5%;
	background: ${(props) => props.theme.colors.container.primary.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	box-shadow: 0 0 2.5px ${(props) => props.theme.colors.shadow.primary};
	padding: 20px;
	overflow-y: auto;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		width: 100%;
	}
`;

export const Title = styled.h2`
	line-height: 1.55;
	color: ${(props) => props.theme.colors.font.primary.alt2};
	font-family: ${(props) => props.theme.typography.family.alt1};
	margin: 0 0 20px 0;
	b {
		font-family: ${(props) => props.theme.typography.family.alt1};
		color: ${(props) => props.theme.colors.font.primary.alt2};
		font-size: ${(props) => props.theme.typography.size.h2};
		font-weight: ${(props) => props.theme.typography.weight.medium};
	}
`;

export const Description = styled.p`
	color: ${(props) => props.theme.colors.font.primary.active.base};
	font-size: ${(props) => props.theme.typography.size.base};
	line-height: 1.45;
	b {
		color: ${(props) => props.theme.colors.font.primary.active.base};
		font-size: ${(props) => props.theme.typography.size.base};
		line-height: 1.45;
	}
`;

export const AssetContainer = styled.div`
	width: 47.5%;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		width: 100%;
		margin: 40px 0 0 0;
	}
`;

export const Asset = styled.div<{ image: string }>`
	height: 100%;
	width: 100%;
	background-image: ${(props) => `url("${props.image}")`};
	background-size: cover;
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		height: 400px;
	}
`;

export const AssetSource = styled.p`
	font-size: 12px;
	line-height: 1.25;
	color: ${(props) => props.theme.colors.font.primary.alt7};
	margin: 5px 0 0 0;
`;
