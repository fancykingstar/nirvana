import React from "react";

import { useAppContext } from "../AppContextProvider";
import classed from "../ClassedComponent";
import logo from "./../../images/logo.png";

const HeaderContainer = classed.header(
    "items-center",
    "bg-blue-200",
    "text-black",
    "flex",
    "shadow",
    "border-orange-500",
);

const EnvSelectorContainer = classed.div("p-1");

export default function Header() {
    const { env: apiEnv, setEnv } = useAppContext();

    return (
        <HeaderContainer className="header-top-banner bg-center bg-no-repeat bg-cover border-orange-500 border-solid border-b-2 h-56">
            <div className="absolute top-0 w-40">
                <a href="">
                    <img src={logo} />
                </a>
            </div>

            {window.location.hostname ===
            "prod.nirvana.imaginecruising.net" ? null : (
                <EnvSelectorContainer className="absolute right-0">
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
