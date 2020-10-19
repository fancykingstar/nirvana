import styled from "styled-components";
import { transparentize, mix } from "polished";

export const FilterListContainer = styled.div`
    align-items: stretch;
    border-radius: ${(p) => p.theme.size[1]};
    display: flex;
    flex-direction: column;
    margin: ${(p) => p.theme.size[1]};

    ${(p) => p.theme.shadow[1]};
`;

export const Title = styled.h1`
    background-color: ${(p) => p.theme.color.white};
    color: ${(p) => p.theme.color.black};
    padding: ${(p) => p.theme.size[1]};
    border-top-right-radius: ${(p) => p.theme.size[1]};
    border-top-left-radius: ${(p) => p.theme.size[1]};
`;

export const TableContainer = styled.div`
    display: block;
    padding: ${(p) => p.theme.size[1]};
    position: relative;
`;

export const LoadingOverlay = styled.div`
    position: absolute;
    top: ${(p) => p.theme.size[1]};
    left: ${(p) => p.theme.size[1]};
    right: ${(p) => p.theme.size[1]};
    bottom: ${(p) => p.theme.size[1]};
    display: flex;
    align-items: center;
    justify-content: center;

    color: ${(p) => p.theme.color.white};
    font-size: ${(p) => p.theme.text[4]};
    background: ${(p) => transparentize(1 / 2, p.theme.color.black)};
`;

export const TableStyled = styled.table`
    width: 100%;

    thead,
    tfoot {
        background-color: ${(p) =>
            mix(1 / 3, p.theme.color.gray, p.theme.color.white)};
    }

    tbody tr:nth-child(odd) {
        background-color: ${(p) =>
            mix(1 / 5, p.theme.color.gray, p.theme.color.white)};
    }

    tbody tr:nth-child(even) {
        background-color: ${(p) => p.theme.color.white};
    }
`;

export const ControlSectionContainer = styled.div`
    padding: ${(p) => p.theme.size[1]};
    border-bottom-width: 1px;
    border-bottom-color: ${(p) => p.theme.color.gray};
    border-bottom-style: solid;
`;

export const Cell = styled.td`
    padding: ${(p) => p.theme.size[0]} ${(p) => p.theme.size[1]};
`;

export const LoadingCell = styled(Cell)``;

export const ControlCell = styled(Cell)`
    cursor: pointer;
    position: relative;
    width: ${(p) => p.width};

    &:after {
        position: absolute;
        right: ${(p) => p.theme.size[1]};
        top: ${(p) => p.theme.size[0]};
        bottom: ${(p) => p.theme.size[0]};
        ${({ arrowDirection }) => {
            if (arrowDirection === "ASC") {
                return `content: "▲"`;
            }

            if (arrowDirection === "DESC") {
                return `content: "▼"`;
            }

            return "";
        }};
    }
`;
