import React from "react";
import cn from "classname";

import { FormContext, FormProvider } from "../../hooks/useFormContext";

import TitleBox from "../TitleBox";

function SectionSelector({
    setActiveId,
    activeChild,
    upperFormContext,
    childArray,
}) {
    const currentId = activeChild?.props?.id;

    const lowerFormContext = React.useContext(FormContext);

    React.useEffect(() => {
        if (Object.keys(upperFormContext.state.remote)) {
            lowerFormContext.dispatch({
                type: "LOAD",
                data: upperFormContext.state.remote,
            });
        }
    }, [upperFormContext.state.remote]);

    React.useEffect(() => {
        for (const prop of activeChild?.props?.props ?? []) {
            upperFormContext.dispatch({
                type: "SET_LOCAL",
                prop,
                value: lowerFormContext.state.local[prop],
            });
        }
    }, [lowerFormContext.state.local]);

    function onSelectSection({ oldSection, newSection }) {
        for (const prop of oldSection.props) {
            upperFormContext.dispatch({
                type: "SET_LOCAL",
                prop,
                value: oldSection.defaultValues[prop],
            });
        }

        for (const prop of newSection.props) {
            upperFormContext.dispatch({
                type: "SET_LOCAL",
                prop,
                value: lowerFormContext.state.local[prop],
            });
        }

        setActiveId(newSection.id);
    }

    return (
        <div className="flex w-full shadow">
            {childArray.map(
                ({ props: { props, label, id, defaultValues } }) => (
                    <div
                        key={id}
                        className={cn(
                            "cursor-pointer",
                            "flex-1",
                            "hover:bg-blue-200",
                            "hover:text-blue-800",
                            "p-2",
                            "text-center",
                            "text-lg",
                            id === currentId
                                ? ["text-white", "bg-blue-500"]
                                : ["text-black"],
                        )}
                        onClick={onSelectSection.bind(null, {
                            oldSection: activeChild?.props,
                            newSection: { props, id, defaultValues },
                        })}
                    >
                        {label}
                    </div>
                ),
            )}
        </div>
    );
}

export default function FormFieldOneOfFieldsGroup({ children, label }) {
    const childArray = React.Children.toArray(children);

    const upperFormContext = React.useContext(FormContext);

    const [activeId, setActiveId] = React.useState(null);

    React.useEffect(() => {
        if (Object.keys(upperFormContext.state.remote)) {
            const activeChild =
                childArray.find(({ props: { isActive } }) =>
                    isActive(upperFormContext.state.local),
                ) ?? childArray[0];

            setActiveId(activeChild?.props.id);
        }
    }, [upperFormContext.state.remote]);

    const activeChild = childArray.find(({ props: { id } }) => id === activeId);

    return (
        <FormProvider>
            <div
                className="form-field-grid-row-all"
                data-testid="form-field-one-of-fields-group"
            >
                <TitleBox>
                    <TitleBox.Header>{label}</TitleBox.Header>
                    <SectionSelector
                        upperFormContext={upperFormContext}
                        childArray={childArray}
                        activeChild={activeChild}
                        setActiveId={setActiveId}
                    />
                    <TitleBox.Body>
                        <div className="py-2 form-field-grid-container">
                            {activeChild ?? null}
                        </div>
                    </TitleBox.Body>
                </TitleBox>
            </div>
        </FormProvider>
    );
}

FormFieldOneOfFieldsGroup.Section = function Section({ children }) {
    return children;
};
