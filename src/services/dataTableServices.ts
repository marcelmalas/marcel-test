import { TABLE_DATA_BASE_URL } from "constants/apiEndpoints";
import { baseURL } from "constants/configs";
import { TableData } from "models/tableData.interface";

const dataTableServices = {
  getTableData: async () => {
    try {
      const response = await fetch(`${baseURL}${TABLE_DATA_BASE_URL}`);
      const users = await response.json();
      return users;
    } catch (error) {
      throw error;
    }
  },

  deleteTableRow: async (id: number) => {
    try {
      const response = await fetch(`${baseURL}${TABLE_DATA_BASE_URL}/${id}`, {
        method: "DELETE",
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  EditTableRow: async (id: number, reqBody: TableData) => {
    try {
      const response = await fetch(`${baseURL}${TABLE_DATA_BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody),
      });

      return response;
    } catch (error) {
      throw error;
    }
  },

  AddRow: async (reqBody: TableData) => {
    try {
      const response = await fetch(`${baseURL}${TABLE_DATA_BASE_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody),
      });

      return await response.json();
    } catch (error) {
      throw error;
    }
  },
};

export default dataTableServices;
