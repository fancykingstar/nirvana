import React from "react";
import styled from "styled-components";

import { useNetworkEnv } from "../NetworkProvider";

const HeaderContainer = styled.header`
    align-items: center;
    background-color: aliceblue;
    color: darkgray;
    display: flex;
    padding: 1rem;
`;

const Title = styled.h1`
    flex: 1;
    font-size: 3rem;
`;

const EnvSelectorContainer = styled.div`
    padding: 0.5rem;
`;

export default function Header() {
    const { env: apiEnv, updateEnv } = useNetworkEnv();

    return (
        <HeaderContainer>
            <Title>Nirvana</Title>
            <EnvSelectorContainer>
                environment:{" "}
                <select
                    onChange={(e) => updateEnv(e.target.value)}
                    value={apiEnv}
                >
                    <option value="prod">production</option>
                    <option value="dev">develop</option>
                    <option value="local">local</option>
                </select>
            </EnvSelectorContainer>
        </HeaderContainer>
    );
}
