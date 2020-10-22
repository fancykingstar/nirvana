import React from "react";

import { Cell, LoadingCell } from "./styled";

export default function TableBody({
    data,
    pageSize,
    rows,
    checked,
    setChecked,
    RowComponent,
}) {
    return data
        ? data.map((x, i) => (
              <tr key={x.id}>
                  <Cell>
                      <input
                          checked={Boolean(checked[x.id])}
                          type="checkbox"
                          onClick={() =>
                              setChecked((checked) => ({
                                  ...checked,
                                  [x.id]: !checked[x.id],
                              }))
                          }
                      />
                  </Cell>
                  <RowComponent i={i} {...x} />
              </tr>
          ))
        : new Array(pageSize).fill(null).map((_, i) => (
              <tr key={i}>
                  {new Array(rows + 1).fill(null).map((_, i) => (
                      <LoadingCell key={i}>&nbsp;</LoadingCell>
                  ))}
              </tr>
          ));
}