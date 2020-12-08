import React from "react";

import TitleBox from "../TitleBox";
import FormFieldGrid from "../FormFieldGrid";

import { FormProvider } from "../../hooks/useFormContext";

import Step01Description from "./Step01Description";
import ConfirmPage from "./ConfirmPage";

const steps = [Step01Description, ConfirmPage];

export default function ProductWizard() {
    const [currentPage, setCurrentPage] = React.useState(0);

    function decrementPage() {
        setCurrentPage((x) => Math.max(0, x - 1));
    }

    function incrementPage() {
        setCurrentPage((x) => Math.min(steps.length - 1, x + 1));
    }

    const CurrentStep = steps[currentPage];

    return (
        <TitleBox>
            <TitleBox.Header>Product Wizard</TitleBox.Header>
            <TitleBox.Body>
                <FormFieldGrid>
                    <FormProvider>
                        <CurrentStep {...{ incrementPage, decrementPage }} />
                    </FormProvider>
                </FormFieldGrid>
            </TitleBox.Body>
        </TitleBox>
    );
}
