import React from "react";
import useSWR, { mutate } from "swr";
import qs from "querystring";

import Button from "../../Button";
import EnvLink from "../../EnvLink";
import TitleBoxModalWithVisibilityButton from "../../TitleBoxModalWithVisibilityButton";
import classed from "../../ClassedComponent";
import { KeyboardInputBox } from "../../Input";
import { useAPIFetch } from "../../AppContextProvider";
import { useToast } from "../../ToastProvider";

const Td = classed.td(
    "px-2",
    "odd:bg-gray-100",
    "even:bg-gray-200",
    "border-r-2",
);
const Tr = classed.tr(
    "px-2",
    "odd:text-black",
    "even:text-gray-800",
    "border-b-2",
);

export default function ItinerarySearchByName({ productId }) {
    const fetch = useAPIFetch();
    const [searchString, setSearchString] = React.useState("");
    const { data } = useSWR(
        `/itineraries?${qs.encode({
            name_contains: searchString,
        })}`,
    );
    const { addToast, removeToast } = useToast();

    async function createProductItinerary({ itineraryId }) {
        const id = addToast({ title: "Adding Itinerary to product" });

        try {
            await fetch(`/product-itineraries`, {
                method: "POST",
                body: JSON.stringify({
                    ordering: 0,
                    placement: "base",
                    product: productId,
                    itinerary: itineraryId,
                }),
            });

            await mutate(`/products/${productId}`);

            removeToast(id);

            addToast({
                title: "Added Itinerary to product",
                color: "green",
                timeout: 1000,
            });
        } catch (e) {
            removeToast(id);

            addToast({
                title: "Failed to add Itinerary to product",
                color: "red",
                timeout: 3000,
                message: Object.values(e).join("\n"),
            });
        }
    }

    return (
        <TitleBoxModalWithVisibilityButton
            Header={({ onClose }) => (
                <React.Fragment>
                    <span className="flex-1 pr-4">Search By Name</span>
                    <Button color="red" onClick={onClose}>
                        Close
                    </Button>
                </React.Fragment>
            )}
            buttonText="Add Itinerary By Name"
        >
            {({ onClose }) => (
                <React.Fragment>
                    <div className="flex items-center pb-2">
                        <label className="pr-2">Name:</label>
                        <KeyboardInputBox
                            type="text"
                            className="flex-1"
                            onChange={(e) => setSearchString(e.target.value)}
                            value={searchString}
                        />
                    </div>

                    <table className="border-t-2 border-l-2">
                        <thead>
                            <Tr>
                                <Td>Add</Td>
                                <Td>Id</Td>
                                <Td>Name</Td>
                                <Td>Items</Td>
                                <Td>Days</Td>
                                <Td>Products</Td>
                            </Tr>
                        </thead>
                        <tbody>
                            {data
                                ? data.map(
                                      ({
                                          id,
                                          name,
                                          products,
                                          itinerary_items,
                                      }) => (
                                          <Tr key={id}>
                                              <Td>
                                                  <Button
                                                      color="green"
                                                      onClick={() => {
                                                          createProductItinerary(
                                                              {
                                                                  itineraryId: id,
                                                              },
                                                          );
                                                          onClose();
                                                      }}
                                                  >
                                                      Add
                                                  </Button>
                                              </Td>
                                              <Td>
                                                  <EnvLink
                                                      to={`/itineraries/${id}`}
                                                  >
                                                      {id}
                                                  </EnvLink>
                                              </Td>
                                              <Td>{name}</Td>
                                              <Td>{itinerary_items.length}</Td>
                                              <Td>
                                                  {
                                                      itinerary_items.slice(
                                                          -1,
                                                      )[0]?.end_day
                                                  }
                                              </Td>
                                              <Td>{products.length} </Td>
                                          </Tr>
                                      ),
                                  )
                                : null}
                        </tbody>
                    </table>
                </React.Fragment>
            )}
        </TitleBoxModalWithVisibilityButton>
    );
}
