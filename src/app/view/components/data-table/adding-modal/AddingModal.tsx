import React, { useState } from "react";

import { useToast } from "hooks/useToast";
import dataTableServices from "services/dataTableServices";
import { TableData } from "models/tableData.interface";
import { generateUniqueId } from "utils/generateUniqueId";
import { IModalProps } from "../../shared/modal/Modal.type";
import InputLabelGroup from "../../shared/input-label-group/InputLabelGroup";
import IconButton from "../../shared/icon-button/IconButton";
import Loader from "../../shared/loader/Loader";
import Modal from "../../shared/modal/Modal";

import SAVE_ICON from "assets/icons/save-icon.svg";

import styles from "./AddingModal.module.scss";

interface IAddingModalProps extends Omit<IModalProps, "children"> {
  setData: (value: React.SetStateAction<TableData[]>) => void;
  data: TableData[];
}

const AddingModal: React.FunctionComponent<IAddingModalProps> = ({
  show,
  onClose,
  setData,
  data,
}) => {
  const { addToast } = useToast();

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [roleError, setRoleError] = useState<string>("");

  const [isSaveLoading, setIsSaveLoading] = useState(false);

  const handleUserNameChange = (val: string) => {
    setUsername(val);
    if (usernameError) setUsernameError("");
  };

  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (emailError) setEmailError("");
  };

  const handleRoleChange = (val: string) => {
    setRole(val);
    if (roleError) setRoleError("");
  };

  const validateUsername = () => {
    if (!username) {
      setUsernameError("Username is required.");
      return false;
    }
    return true;
  };

  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email format.");
      return false;
    }
    return true;
  };

  const validateRole = () => {
    if (!role) {
      setRoleError("Role is required.");
      return false;
    }
    return true;
  };

  const addNewRow = async () => {
    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail();
    const isRoleValid = validateRole();

    if (!isUsernameValid || !isEmailValid || !isRoleValid) {
      return;
    }

    try {
      setIsSaveLoading(true);
      const newRow: TableData = {
        id: 999, // Mock api generates the ids so we can pass here anything
        email,
        name: username,
        date: new Date(),
        role,
      };
      const response: TableData = await dataTableServices.AddRow(newRow);
      const newData = [...data, response];
      setData(newData);
      addToast({
        id: generateUniqueId(),
        message: "A new row has been added!",
        type: "success",
      });
      setUsername("");
      setEmail("");
      setRole("");
      onClose();
    } catch (error) {
      console.error("Error Adding new row: ", error);
    } finally {
      setIsSaveLoading(false);
    }
  };

  return (
    <Modal show={show} onClose={onClose} headerText="Add new">
      <div className={styles.form}>
        <InputLabelGroup
          label="Name"
          id="username"
          placeholder="Enter username"
          value={username}
          onChange={handleUserNameChange}
          error={usernameError}
        />

        <InputLabelGroup
          label="Email address"
          id="email"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={handleEmailChange}
          error={emailError}
        />

        <InputLabelGroup
          label="Role"
          id="role"
          placeholder="Enter role"
          value={role}
          onChange={handleRoleChange}
          error={roleError}
        />

        <IconButton
          disabled={isSaveLoading}
          onClick={addNewRow}
          icon={
            isSaveLoading ? (
              <Loader size={15} />
            ) : (
              <img src={SAVE_ICON} alt="save-icon" />
            )
          }
          text="Save"
        />
      </div>
    </Modal>
  );
};

export default AddingModal;
