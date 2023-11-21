import React from "react";
import styles from "./Loader.module.scss";

interface ILoaderProps {
  size?: number;
}

const Loader: React.FC<ILoaderProps> = ({ size = 20 }) => {
  const loaderStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderWidth: `${size / 10}px`,
  };

  return <div className={styles.loader} style={loaderStyle} />;
};

export default Loader;
