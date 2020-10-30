import React from "react";

import { FormContext, FormProvider } from "../../hooks/useFormContext";

import classed from "../ClassedComponent";
import FormFieldDebug from "../FormFieldDebug";
import TitleBox from "../TitleBox";

const SectionSelectorOption = classed.div(
    "cursor-pointer",
    "flex-1",
    "hover:bg-blue-200",
    "hover:text-blue-800",
    "p-2",
    "text-center",
    "text-lg",
    ({ active }) => (active ? ["text-white", "bg-blue-500"] : ["text-black"]),
);

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
            <FormFieldDebug />
            {childArray.map(
                ({ props: { props, label, id, defaultValues } }) => (
                    <SectionSelectorOption
                        active={id === currentId}
                        key={id}
                        className="flex-1 text-center cursor-pointer"
                        onClick={onSelectSection.bind(null, {
                            oldSection: activeChild?.props,
                            newSection: { props, id, defaultValues },
                        })}
                    >
                        {label}
                    </SectionSelectorOption>
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
            <div className="form-field-grid-row-all">
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
