import React from "react";
import { TableData } from "models/tableData.interface";

import SORT_ICON from "assets/icons/sort-icon.svg";

interface TableHeaderCellProps {
  title: string;
  field: keyof TableData;
  onSort: (field: keyof TableData) => void;
}

const TableHeaderCell: React.FC<TableHeaderCellProps> = ({
  title,
  field,
  onSort,
}) => {
  return (
    <th onClick={() => onSort(field)}>
      {title}{" "}
      <span>
        <img src={SORT_ICON} alt="sort-icon" />
      </span>
    </th>
  );
};

export default TableHeaderCell;
