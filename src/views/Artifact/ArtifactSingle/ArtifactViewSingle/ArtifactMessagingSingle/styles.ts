import styled from 'styled-components';

import { STYLING } from 'helpers/styling';
import { open, fadeIn2 } from 'helpers/animations';

export const Wrapper = styled.div`
    display: flex;
    width: ${STYLING.dimensions.threadWidth};
    max-width: 100%;
    margin: 0 auto;
    position: relative;
    display flex;
    justify-content: space-between;
    @media(max-width: ${STYLING.dimensions.threadWidth}) {
        width: auto;
    }
`;

export const DetailWrapper = styled.div`
	min-height: 141.5px;
	width: 100%;
	position: relative;
	animation: ${open} ${fadeIn2};
	background: ${(props) => props.theme.colors.container.primary.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	z-index: 3;
`;
