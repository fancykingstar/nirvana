import React from "react";
import classed from "../ClassedComponent";

const FooterContainer = classed.footer(
    "items-center",
    "bg-blue-200",
    "flex",
    "p-1",
    "text-gray-800",
);

const FooterInfo = classed.span("py-1");

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
