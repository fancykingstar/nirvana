import React from "react";

export default function Footer() {
    if (!process.env.CI) {
        return <footer>development build</footer>;
    }

    return (
        <footer>
            <span> {process.env.BITBUCKET_BUILD_NUMBER}</span>
            <span> | </span>
            <span> {process.env.BITBUCKET_COMMIT}</span>
            <span> | </span>
            <span> {process.env.BITBUCKET_BRANCH}</span>
            <span> | </span>
            <span> {new Date().toISOString()}</span>
        </footer>
    );
}
