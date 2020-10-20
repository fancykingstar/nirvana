import styled from "styled-components";

const FormFieldGrid = styled.div`
    display: grid;
    grid-template-columns: [label] auto [required] auto [input] 1fr [updated] auto [end];

    column-gap: ${(p) => p.theme.size[1]};
    row-gap: ${(p) => p.theme.size[1]};
`;

export default FormFieldGrid;
