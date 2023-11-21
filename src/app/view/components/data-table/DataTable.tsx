import React, { useState, useMemo } from "react";
import { TableProps } from "./DataTable.types";
import { TableData } from "models/tableData.interface";
import AddingModal from "./adding-modal/AddingModal";
import TableActions from "./table-actions/TableActions";
import useScreenType from "hooks/useScreenType";
import { ScreenType } from "models/ScreenType.enum";
import { extractDateFromTimestamp } from "utils/extractDateFromTimestamp";
import IconButton from "../shared/icon-button/IconButton";
import Input from "../shared/input/Input";
import Collapse from "../shared/collapse/Collapse";
import TableHeaderCell from "./table-header-cell/TableHeaderCell";

import ADD_ICON from "assets/icons/add-icon.svg";

import styles from "./DataTable.module.scss";

const DataTable: React.FC<TableProps> = ({ data: initialData, canEdit }) => {
  const screenType = useScreenType();

  const [data, setData] = useState(initialData);

  const [editableRow, setEditableRow] = useState<TableData | null>(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [sortField, setSortField] = useState<keyof TableData | null>(null);

  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);

  const closeModal = () => setShowModal(false);

  const sortedAndFilteredData = useMemo(() => {
    let filteredData = data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    if (sortField) {
      filteredData = filteredData.sort((a, b) => {
        if (a[sortField] < b[sortField]) {
          return sortDirection === "asc" ? -1 : 1;
        }
        if (a[sortField] > b[sortField]) {
          return sortDirection === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredData;
  }, [data, searchTerm, sortField, sortDirection]);

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
  };

  const handleSort = (field: keyof TableData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editableRow) {
      setEditableRow({
        ...editableRow,
        [event.target.name]: event.target.value,
      });
    }
  };

  return (
    <>
      {canEdit && (
        <AddingModal
          show={showModal}
          onClose={closeModal}
          data={data}
          setData={setData}
        />
      )}

      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <Input
            placeholder="Type to find what you are looking for..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {screenType !== ScreenType.Mobile && canEdit && (
            <IconButton
              onClick={openModal}
              icon={<img src={ADD_ICON} alt="add-icon" />}
              text="Add new"
            />
          )}
        </div>

        {screenType === ScreenType.Desktop ||
        screenType === ScreenType.LargeDesktop ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <TableHeaderCell
                  title="Name"
                  field="name"
                  onSort={handleSort}
                />
                <TableHeaderCell
                  title="Role"
                  field="role"
                  onSort={handleSort}
                />
                <TableHeaderCell
                  title="Email"
                  field="email"
                  onSort={handleSort}
                />
                <TableHeaderCell
                  title="Date"
                  field="date"
                  onSort={handleSort}
                />
                {canEdit && <th />}
              </tr>
            </thead>
            <tbody>
              {sortedAndFilteredData.map((row) => {
                const { date, id: rowID, name, role, email } = row;
                const isEditThisRow = editableRow && editableRow.id === rowID;
                return (
                  <tr key={rowID} className={styles.tr}>
                    <td>{name}</td>
                    <td>
                      {!isEditThisRow ? (
                        role
                      ) : (
                        <input
                          type="text"
                          name="role"
                          value={editableRow.role}
                          onChange={handleEditChange}
                        />
                      )}
                    </td>
                    <td>
                      {!isEditThisRow ? (
                        email
                      ) : (
                        <input
                          type="email"
                          name="email"
                          value={editableRow.email}
                          onChange={handleEditChange}
                        />
                      )}
                    </td>
                    <td>{extractDateFromTimestamp(date)}</td>
                    {canEdit && (
                      <td>
                        <TableActions
                          editableRow={editableRow}
                          tableRow={row}
                          data={data}
                          setData={setData}
                          setEditableRow={setEditableRow}
                        />
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className={styles.collapseContainer}>
            {sortedAndFilteredData.map((row) => {
              const { date, id: rowID, name, role, email } = row;
              const isEditThisRow = editableRow && editableRow.id === rowID;
              return (
                <Collapse key={rowID} title={name}>
                  <div className={styles.collapseContent}>
                    <div className={styles.collapseCard}>
                      <div className={styles.collapseRow}>
                        <span>Role</span>
                        <span>
                          {!isEditThisRow ? (
                            role
                          ) : (
                            <input
                              type="text"
                              name="role"
                              value={editableRow.role}
                              onChange={handleEditChange}
                            />
                          )}
                        </span>
                      </div>
                      <div className={styles.collapseRow}>
                        <span>Email</span>
                        <span>
                          {!isEditThisRow ? (
                            email
                          ) : (
                            <input
                              type="email"
                              name="email"
                              value={editableRow.email}
                              onChange={handleEditChange}
                            />
                          )}
                        </span>
                      </div>
                      <div className={styles.collapseRow}>
                        <span>Date</span>
                        <span>{extractDateFromTimestamp(date)}</span>
                      </div>
                      {canEdit && (
                        <div
                          className={`${styles.collapseRow} ${styles.actions}`}
                        >
                          <TableActions
                            editableRow={editableRow}
                            tableRow={row}
                            data={data}
                            setData={setData}
                            setEditableRow={setEditableRow}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </Collapse>
              );
            })}

            {screenType === ScreenType.Mobile && canEdit && (
              <div className={styles.floatingButton}>
                <IconButton
                  onClick={openModal}
                  icon={<img src={ADD_ICON} alt="add-icon" />}
                  text="Add new"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default DataTable;
