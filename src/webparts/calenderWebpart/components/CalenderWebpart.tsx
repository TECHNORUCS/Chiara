import * as React from "react";
import { sp } from "@pnp/sp";
import styles from "./CalenderWebpart.module.scss";
import { ICalenderWebpartProps } from "./ICalenderWebpartProps";
import { escape } from "@microsoft/sp-lodash-subset";
import CalendarComponent from "./CalenderComponent";

export default class CalenderWebpart extends React.Component<
  ICalenderWebpartProps,
  {}
> {
  constructor(prop: ICalenderWebpartProps, state: {}) {
    super(prop);
    sp.setup({
      spfxContext: this.props.context,
    });
  }
  public render(): React.ReactElement<ICalenderWebpartProps> {
    return <CalendarComponent context={sp} />;
  }
}
