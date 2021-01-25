import React from "react";
import cn from "classnames";

import ModalPortal from "../ModalPortal";
import TitleBox from "../TitleBox";
import { FormProvider } from "../../hooks/useFormContext";

import Button from "../Button";

export default function TitleBoxModalWithVisibilityButton({
    buttonText,
    Header,
    children,
}) {
    const [showModal, setShowModal] = React.useState(false);

    return (
        <React.Fragment>
            <Button onClick={setShowModal.bind(null, true)} color="orange">
                {buttonText}
            </Button>

            {showModal ? (
                <ModalPortal>
                    <FormProvider>
                        <div
                            className={cn(
                                "pointer-events-auto",
                                "absolute",
                                "flex",
                                "inset-0",
                                "items-center",
                                "justify-center",
                            )}
                        >
                            <TitleBox>
                                <TitleBox.Header>
                                    <Header
                                        onClose={setShowModal.bind(null, false)}
                                    />
                                </TitleBox.Header>
                                <TitleBox.Body>
                                    {children({
                                        onClose: setShowModal.bind(null, false),
                                    })}
                                </TitleBox.Body>
                            </TitleBox>
                        </div>
                    </FormProvider>
                </ModalPortal>
            ) : null}
        </React.Fragment>
    );
}
