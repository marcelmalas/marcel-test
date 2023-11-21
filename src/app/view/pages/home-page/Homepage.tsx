import * as React from "react";
import { useAuth } from "hooks/useAuth";
import useFetchData from "hooks/useFetchData";
import { UserRole } from "models/user.interface";
import dataTableServices from "services/dataTableServices";
import Loader from "app/view/components/shared/loader/Loader";
import DataTable from "app/view/components/data-table/DataTable";
import { TableData } from "models/tableData.interface";

import ERROR_IMG from "assets/images/error-img.svg";

import styles from "./Homepage.module.scss";

const Homepage: React.FC = () => {
  const { user } = useAuth();

  const { data, loading, error } = useFetchData<TableData[] | null>(() =>
    dataTableServices.getTableData()
  );

  if (loading) {
    return (
      <div className={styles.fallbackContainer}>
        <Loader size={70} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.fallbackContainer}>
        <img src={ERROR_IMG} alt="error" />
      </div>
    );
  }

  if (!data || data.length === 0) return <div>no data</div>;

  return <DataTable data={data} canEdit={user?.role === UserRole.Editor} />;
};

export default Homepage;
