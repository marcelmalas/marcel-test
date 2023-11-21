import { TableData } from "models/tableData.interface";

export interface TableProps {
  data: TableData[];
  canEdit: boolean;
}
