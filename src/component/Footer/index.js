import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
    align-items: center;
    background-color: aliceblue;
    color: darkgray;
    display: flex;
    padding: 1rem;
`;

const FooterInfo = styled.span`
    padding: 0 0.25rem;
`;

export default function Footer() {
    if (!process.env.CI) {
        return <FooterContainer>development build</FooterContainer>;
    }

    return (
        <FooterContainer>
            <FooterInfo>{process.env.BITBUCKET_BRANCH}</FooterInfo>
            <FooterInfo>{process.env.BITBUCKET_BUILD_NUMBER}</FooterInfo>
            <FooterInfo>{process.env.BITBUCKET_COMMIT}</FooterInfo>
        </FooterContainer>
    );
}
