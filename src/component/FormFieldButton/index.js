import styled from "styled-components";

export const FormFieldButton = styled.button`
    background-color: ${(p) => p.theme.color[p.color || "white"]};
    border-radius: ${(p) => p.theme.size[0]};
    color: ${(p) => (p.color ? p.theme.color.white : p.theme.color.black)};
    cursor: pointer;
    padding: ${(p) => p.theme.size[0]} ${(p) => p.theme.size[1]};

    ${(p) => p.theme.shadow[2]};
`;

export const FormFieldButtonBlock = styled.div`
    display: flex;
    grid-column: input / input;

    ${FormFieldButton} {
        border-radius: 0;
    }

    ${FormFieldButton}:first-child {
        border-top-left-radius: ${(p) => p.theme.size[0]};
        border-bottom-left-radius: ${(p) => p.theme.size[0]};
    }

    ${FormFieldButton}:last-child {
        border-top-right-radius: ${(p) => p.theme.size[0]};
        border-bottom-right-radius: ${(p) => p.theme.size[0]};
    }
`;

export default FormFieldButton;
