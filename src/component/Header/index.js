import React from "react";

import { useAppContext } from "../AppContextProvider";
import classed from "../ClassedComponent";

const HeaderContainer = classed.header(
    "items-center",
    "bg-blue-200",
    "text-black",
    "flex",
    "p-4",
    "shadow",
);

const Title = classed.h1("flex-1", "text-lg");

const EnvSelectorContainer = classed.div("p-1");

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
