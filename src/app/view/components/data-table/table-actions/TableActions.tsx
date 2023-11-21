import React, { useState } from "react";
import dataTableServices from "services/dataTableServices";
import { generateUniqueId } from "utils/generateUniqueId";
import { useToast } from "hooks/useToast";
import { TableData } from "models/tableData.interface";
import IconButton from "../../shared/icon-button/IconButton";
import Loader from "../../shared/loader/Loader";

import EDIT_ICON from "assets/icons/edit-icon.svg";
import DELETE_ICON from "assets/icons/delete-icon.svg";
import CANCEL_ICON from "assets/icons/cancel.svg";
import SAVE_ICON from "assets/icons/save-icon.svg";

import styles from "./TableActions.module.scss";
import Modal from "../../shared/modal/Modal";

interface ITableActionsProps {
  tableRow: TableData;
  editableRow: TableData | null;
  setData: (value: React.SetStateAction<TableData[]>) => void;
  setEditableRow: React.Dispatch<React.SetStateAction<TableData | null>>;
  data: TableData[];
}

const TableActions: React.FunctionComponent<ITableActionsProps> = ({
  tableRow,
  editableRow,
  data,
  setData,
  setEditableRow,
}) => {
  const { addToast } = useToast();

  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);

  const closeModal = () => setShowModal(false);

  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  const [isEditLoading, setIsEditLoading] = useState<boolean>(false);

  const deleteRow = async (id: number) => {
    try {
      setIsDeleteLoading(true);
      await dataTableServices.deleteTableRow(id);
      const newData = data.filter((row) => row.id !== id);
      setData(newData);
      addToast({
        id: generateUniqueId(),
        message: "A row has been deleted!",
        type: "success",
      });
    } catch (error) {
      console.error("Error deleting the row: ", error);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  const startEdit = (row: TableData) => {
    setEditableRow({ ...row });
  };

  const cancelEdit = () => {
    setEditableRow(null);
  };

  const saveEdit = async (id: number, newRow: TableData) => {
    try {
      setIsEditLoading(true);
      const response = await dataTableServices.EditTableRow(id, newRow);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const newData = data.map((row) => {
        if (row.id === id) {
          return { ...row, ...newRow };
        }
        return row;
      });
      setData(newData);
      setEditableRow(null);
      addToast({
        id: generateUniqueId(),
        message: "A row has been updated!",
        type: "success",
      });
    } catch (error) {
      console.error("Error updating the row: ", error);
    } finally {
      setIsEditLoading(false);
    }
  };

  return (
    <>
      <Modal show={showModal} onClose={closeModal} headerText="Delete">
        <div className={styles.deleteModal}>
          <p>Are you sure you want to delete this row?</p>
          <IconButton
            disabled={isDeleteLoading}
            onClick={() => deleteRow(tableRow.id)}
            text="Yes, Delete"
            icon={
              isDeleteLoading ? (
                <Loader size={15} />
              ) : (
                <img src={SAVE_ICON} alt="delete-icon" />
              )
            }
          />
        </div>
      </Modal>

      {editableRow && editableRow.id === tableRow.id ? (
        <div className={styles.actionsContainer}>
          <IconButton
            disabled={isEditLoading}
            onClick={() => saveEdit(tableRow.id, editableRow)}
            icon={
              isEditLoading ? (
                <Loader size={15} />
              ) : (
                <img src={SAVE_ICON} alt="save-icon" />
              )
            }
            text="Save"
          />

          <IconButton
            onClick={cancelEdit}
            icon={<img src={CANCEL_ICON} alt="cancel-icon" />}
            text="Cancel"
          />
        </div>
      ) : (
        <div className={styles.actionsContainer}>
          <IconButton
            onClick={() => startEdit(tableRow)}
            icon={<img src={EDIT_ICON} alt="edit-icon" />}
            text="Edit"
          />

          <IconButton
            onClick={openModal}
            text="Delete"
            icon={<img src={DELETE_ICON} alt="delete-icon" />}
          />
        </div>
      )}
    </>
  );
};

export default TableActions;
