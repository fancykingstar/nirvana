import React from "react";
import ReactDOM from "react-dom";

export default function ModalProvider({ children }) {
    const el = React.useRef(document.createElement("div"));

    React.useEffect(() => {
        el.current.style = `
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    pointer-events: none;
    `;

        document.body.appendChild(el.current);

        return () => {
            document.body.removeChild(el.current);
        };
    }, []);

    return ReactDOM.createPortal(children, el.current);
}
