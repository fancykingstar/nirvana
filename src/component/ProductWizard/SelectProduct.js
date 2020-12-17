import React from "react";
import useSWR from "swr";
import cn from "classnames";

import Button from "../Button";
import EnvLink from "../EnvLink";
import FormFieldGrid from "../FormFieldGrid";
import FormFieldProductCode from "../FormFieldProductCode";
import FormFieldStatic from "../FormFieldStatic";
import FormFieldString from "../FormFieldString";
import FormFieldUUID from "../FormFieldUUID";
import ModalPortal from "../ModalPortal";
import TitleBox from "../TitleBox";
import { FormProvider } from "../../hooks/useFormContext";
import {
    FormFieldButtonBlock,
    FormFieldButtonCreate,
} from "../FormFieldButton";

function NewProductModal({ history, url, onClose }) {
    return (
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
                            <span className="flex-1 pr-4">New Product</span>
                            <Button color="red" onClick={onClose}>
                                Close
                            </Button>
                        </TitleBox.Header>
                        <TitleBox.Body>
                            <FormFieldGrid>
                                <FormFieldUUID prop="uid" />
                                <FormFieldStatic
                                    prop="product_template"
                                    value="operated"
                                />
                                <FormFieldString
                                    required
                                    label="Name"
                                    prop="name"
                                />
                                <FormFieldString
                                    required
                                    label="Label"
                                    prop="label"
                                />
                                <FormFieldProductCode
                                    required
                                    label="Product Code"
                                    prop="code"
                                />

                                <FormFieldButtonBlock>
                                    <FormFieldButtonCreate
                                        nameProp="name"
                                        listApi="/products"
                                        createApi="/products"
                                        onCreated={(id) => {
                                            history.push(
                                                `${url}/${id}`.replace(
                                                    /\/+/g,
                                                    "/",
                                                ),
                                            );
                                            onClose();
                                        }}
                                    />
                                </FormFieldButtonBlock>
                            </FormFieldGrid>
                        </TitleBox.Body>
                    </TitleBox>
                </div>
            </FormProvider>
        </ModalPortal>
    );
}

export default function SelectProduct({ history, match: { url } }) {
    const [showCreateProductModal, setShowCreateProductModal] = React.useState(
        false,
    );
    const { data } = useSWR("/products");
    const products = data ?? [];

    return (
        <React.Fragment>
            <h2>Select A Product:</h2>

            <ul className="list-disc pl-4">
                {products.map(({ code, active, name, status, id }) => (
                    <li key={id}>
                        <EnvLink to={`/wizard/product/${id}`}>
                            <span className="px-1">({code})</span>
                            <span className="px-1">
                                [{active ? "active" : "inactive"} | {status}]
                            </span>
                            <span className="px-1">{name}</span>
                        </EnvLink>
                    </li>
                ))}
            </ul>

            {data ? (
                <Button
                    color="green"
                    onClick={setShowCreateProductModal.bind(null, true)}
                >
                    Create New Product
                </Button>
            ) : (
                "loading..."
            )}

            {showCreateProductModal ? (
                <NewProductModal
                    onClose={setShowCreateProductModal.bind(null, false)}
                    url={url}
                    history={history}
                />
            ) : null}
        </React.Fragment>
    );
}
