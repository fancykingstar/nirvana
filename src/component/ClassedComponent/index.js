import React from "react";
import cn from "classnames";

function createComponentWithClasses(el, ...classes) {
    const c = (props) => {
        const className = cn(
            classes.map((c) => {
                if (typeof c === "function") {
                    return c(props);
                } else {
                    return c;
                }
            }),
            props.className,
        );

        return React.createElement(el, { ...props, className });
    };

    c.displayName = `classed-${el}`;

    return c;
}

for (const elementType of [
    "button",
    "div",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "header",
    "hr",
    "input",
    "label",
    "nav",
    "select",
    "span",
    "table",
    "td",
    "textarea",
    "tr",
]) {
    createComponentWithClasses[elementType] = createComponentWithClasses.bind(
        null,
        elementType,
    );
}

export default createComponentWithClasses;
