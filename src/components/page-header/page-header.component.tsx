import { FunctionComponent } from "react";
import styles from "./page-header.module.css";

interface PageHeaderComponentProps {
  value: string;
}

export const PageHeaderComponent: FunctionComponent<
  PageHeaderComponentProps
> = ({ value }) => {
  return (
    <>
      <h3 className={styles.hStyle}>{value}</h3>
    </>
  );
};
