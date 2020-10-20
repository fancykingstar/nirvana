import React from "react";
import styled from "styled-components";

import { useAppContext } from "../AppContextProvider";

const HeaderContainer = styled.header`
    align-items: center;
    background-color: ${(p) => p.theme.color.white};
    color: ${(p) => p.theme.color.black};
    display: flex;
    padding: 1rem;
    ${(p) => p.theme.shadow[1]}
`;

const Title = styled.h1`
    flex: 1;
    font-size: 3rem;
`;

const EnvSelectorContainer = styled.div`
    padding: 0.5rem;
`;

export default function Header() {
    const { env: apiEnv, setEnv } = useAppContext();

    return (
        <HeaderContainer>
            <Title>Nirvana</Title>
            <EnvSelectorContainer>
                environment:{" "}
                <select onChange={(e) => setEnv(e.target.value)} value={apiEnv}>
                    <option value="prod">production</option>
                    <option value="dev">develop</option>
                    <option value="local">local</option>
                </select>
            </EnvSelectorContainer>
        </HeaderContainer>
    );
}
