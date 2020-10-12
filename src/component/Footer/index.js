import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
    align-items: center;
    background-color: aliceblue;
    color: darkgray;
    display: flex;
    padding: 1rem;
`;

export default function Footer() {
    if (!process.env.CI) {
        return <FooterContainer>development build</FooterContainer>;
    }

    return (
        <FooterContainer>
            <span> {process.env.BITBUCKET_BUILD_NUMBER}</span>
            <span> | </span>
            <span> {process.env.BITBUCKET_COMMIT}</span>
            <span> | </span>
            <span> {process.env.BITBUCKET_BRANCH}</span>
        </FooterContainer>
    );
}
