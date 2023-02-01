import styled from 'styled-components/macro';

import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	height: 550px;
	width: 100%;
	max-width: ${STYLING.cutoffs.max};
	margin: 15px auto 0 auto;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		height: fit-content;
	}
`;

export const PCWrapper = styled.div`
	height: calc(100% - 15px);
	margin: 15px 0 0 0;
	width: 100%;
	display: flex;
	padding: 25px;
	border: 1px solid ${(props) => props.theme.colors.border.alt1};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		flex-direction: column;
	}
`;

export const C1 = styled.div`
	height: 100%;
	width: 35%;
	a {
		&:hover {
			text-decoration: none;
		}
	}
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		height: auto;
		width: 100%;
	}
`;

export const C1Content = styled.div`
	height: calc(100% - 90px);
	width: calc(100% - 10px);
	padding: 0 25px 25px 5px;
	text-align: left;
	overflow-y: auto;
	background: ${(props) => props.theme.colors.container.primary.background};
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		height: 300px;
		width: 100%;
	}
`;

export const Title = styled.h2`
	line-height: 1.25;
	color: ${(props) => props.theme.colors.font.primary.active.base};
	font-weight: ${(props) => props.theme.typography.weight.medium};
	margin: 0 0 20px 0;
`;

export const Description = styled.p`
	color: ${(props) => props.theme.colors.font.primary.active.base};
	font-size: ${(props) => props.theme.typography.size.base};
	line-height: 1.45;
	b {
		color: ${(props) => props.theme.colors.font.primary.active.base};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		font-size: ${(props) => props.theme.typography.size.base};
	}
	span {
		color: ${(props) => props.theme.colors.font.primary.active.base};
		font-size: ${(props) => props.theme.typography.size.base};
		text-decoration: underline;
	}
`;

export const LinkContainer = styled.div`
	height: 80px;
	width: calc(100% - 10px);
	margin: 10px 0 0 0;
	border: 1px solid ${(props) => props.theme.colors.border.alt2};
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${(props) => props.theme.colors.font.primary.active.base};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	&:hover {
		background: ${(props) => props.theme.colors.font.primary.active.hover};
	}
	span {
		color: ${(props) => props.theme.colors.font.primary.base};
		font-size: ${(props) => props.theme.typography.size.base};
		font-weight: ${(props) => props.theme.typography.weight.medium};
	}
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		width: 100%;
	}
`;

export const C2 = styled.div<{ image: string }>`
	height: 100%;
	width: 65%;
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	background-image: ${(props) => `url("${props.image}")`};
	background-size: cover;
	background-position: center;
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		height: 200px;
		width: 100%;
		margin: 10px 0 0 0;
	}
`;
