import React from "react";

import { useAppContext } from "../AppContextProvider";
import classed from "../ClassedComponent";

import packageJson from "../../../package.json";

const HeaderContainer = classed.header(
    "items-center",
    "bg-blue-200",
    "text-black",
    "flex",
    "p-4",
    "shadow",
);

const Title = classed.h1("flex-1", "text-3xl", "relative");

const UnderConstruction = classed.span(
    "absolute",
    "bg-white",
    "block",
    "border-2",
    "border-red-500",
    "left-0",
    "rounded",
    "shadow",
    "text-center",
    "text-lg",
    "text-red-500",
    "top-0",
    "w-32",

    "transform",
    "rotate-12",
    "translate-x-10",
    "-translate-y-2",
);

const EnvSelectorContainer = classed.div("p-1");

export default function Header() {
    const { env: apiEnv, setEnv } = useAppContext();

    return (
        <HeaderContainer>
            <Title>
                Valhalla
                <UnderConstruction>Alpha Version</UnderConstruction>
                <span className="text-xl pl-16">{packageJson.version}</span>
            </Title>

            {window.location.hostname ===
            "prod.valhalla.imaginecruising.net" ? null : (
                <EnvSelectorContainer>
                    environment:
                    <select
                        className="ml-2"
                        onChange={(e) => setEnv(e.target.value)}
                        value={apiEnv}
                    >
                        <option value="prod">production</option>
                        <option value="dev">develop</option>
                        <option value="local">local</option>
                    </select>
                </EnvSelectorContainer>
            )}
        </HeaderContainer>
    );
}
