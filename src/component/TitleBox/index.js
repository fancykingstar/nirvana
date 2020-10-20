import React from "react";
import styled from "styled-components";

const BoxContainer = styled.div`
    border-radius: ${(p) => p.theme.size[1]};
    align-items: stretch;
    display: flex;
    flex-direction: column;

    ${(p) => p.theme.shadow[1]};
`;

const Title = styled.h1`
    background-color: ${(p) => p.theme.color.white};
    color: ${(p) => p.theme.color.black};
    padding: ${(p) => p.theme.size[1]};
    border-top-right-radius: ${(p) => p.theme.size[1]};
    border-top-left-radius: ${(p) => p.theme.size[1]};
`;

const BoxChildren = styled.div`
    align-items: stretch;
    display: flex;
    flex-direction: column;
    padding: ${(p) => p.theme.size[1]};
`;

export const TitleBoxPadder = styled.div`
    padding: ${(p) => p.theme.size[1]};
`;

export default function TitleBox({ title, children }) {
    return (
        <BoxContainer>
            <Title>{title}</Title>
            <BoxChildren>{children}</BoxChildren>
        </BoxContainer>
    );
}