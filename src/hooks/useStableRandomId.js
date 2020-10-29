import React from "react";
import { nanoid } from "nanoid";

export default function useStableRandomId() {
    return React.useMemo(() => nanoid(), []);
}
