import React from "react";
import cn from "classnames";

import AccommodationField from "../FormProduct/AccommodationField";
import Button from "../Button";
import EnvLink from "../EnvLink";
import FilterList from "../FilterList";
import FormFieldGrid from "../FormFieldGrid";
import FormFieldProductCode from "../FormFieldProductCode";
import FormFieldStatic from "../FormFieldStatic";
import FormFieldString from "../FormFieldString";
import FormFieldUUID from "../FormFieldUUID";
import ModalPortal from "../ModalPortal";
import OperatorField from "../FormProduct/OperatorField";
import TitleBox from "../TitleBox";
import { FormProvider } from "../../hooks/useFormContext";
import {
    FormFieldButtonBlock,
    FormFieldButtonCreate,
} from "../FormFieldButton";

function ProductHeader({ onChangeSort, sortBy, sortDirection }) {
    return (
        <React.Fragment>
            <FilterList.ControlCell
                width="10%"
                onClick={onChangeSort.bind(null, "id")}
                arrowDirection={sortBy === "id" ? sortDirection : null}
            >
                Id
            </FilterList.ControlCell>

            <FilterList.ControlCell
                width="10%"
                onClick={onChangeSort.bind(null, "code")}
                arrowDirection={sortBy === "code" ? sortDirection : null}
            >
                Code
            </FilterList.ControlCell>

            <FilterList.ControlCell
                width="30%"
                onClick={onChangeSort.bind(null, "name")}
                arrowDirection={sortBy === "name" ? sortDirection : null}
            >
                Name
            </FilterList.ControlCell>
            <FilterList.ControlCell
                width="10%"
                onClick={onChangeSort.bind(null, "operator.name")}
                arrowDirection={
                    sortBy === "operator.name" ? sortDirection : null
                }
            >
                Operator
            </FilterList.ControlCell>
            <FilterList.ControlCell
                width="20%"
                onClick={onChangeSort.bind(null, "primary_accommodation.name")}
                arrowDirection={
                    sortBy === "primary_accommodation.name"
                        ? sortDirection
                        : null
                }
            >
                Primary Accommodation
            </FilterList.ControlCell>
            <FilterList.ControlCell width="10%">APIs</FilterList.ControlCell>
        </React.Fragment>
    );
}

function ProductRow({ id, code, name, apis, operator, primary_accommodation }) {
    return (
        <React.Fragment>
            <FilterList.Cell>
                <EnvLink to={`/wizard/product/${id}`}>{id}</EnvLink>
            </FilterList.Cell>
            <FilterList.Cell>
                <EnvLink to={`/wizard/product/${id}`}>{code}</EnvLink>
            </FilterList.Cell>
            <FilterList.Cell>
                <EnvLink to={`/wizard/product/${id}`}>{name}</EnvLink>
            </FilterList.Cell>
            <FilterList.Cell>{operator.name}</FilterList.Cell>
            <FilterList.Cell>{primary_accommodation.name}</FilterList.Cell>
            <FilterList.Cell>
                {apis.map((api) => api.code).join(", ")}
            </FilterList.Cell>
        </React.Fragment>
    );
}

function FilterListProduct() {
    return (
        <FilterList
            title="Products"
            listApi="/products"
            getDeleteApi={(id) => `/products/${id}`}
            HeaderComponent={ProductHeader}
            FooterComponent={ProductHeader}
            RowComponent={ProductRow}
            cols={6}
            searchFilterColNames="name,code,id,apis.code,operator.name,primary_accommodation.name"
        />
    );
}

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
                                <OperatorField />
                                <AccommodationField primaryOnly={true} />

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

    return (
        <React.Fragment>
            <h2>Select A Product:</h2>

            <FilterListProduct />

            <Button
                color="green"
                onClick={setShowCreateProductModal.bind(null, true)}
            >
                Create New Product
            </Button>

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
