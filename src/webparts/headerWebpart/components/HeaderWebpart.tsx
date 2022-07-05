import * as React from "react";
import styles from "./HeaderWebpart.module.scss";
import { IHeaderWebpartProps } from "./IHeaderWebpartProps";

export default class HeaderWebpart extends React.Component<
  IHeaderWebpartProps,
  {}
> {
  public render(): React.ReactElement<IHeaderWebpartProps> {
    return (
      <>
        <div className={styles.container}>
          Hello & Welcome to EGroup's Intranet Portal
        </div>
      </>
    );
  }
}
