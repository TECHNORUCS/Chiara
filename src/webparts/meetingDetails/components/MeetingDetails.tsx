import * as React from "react";
import { sp } from "@pnp/sp";
import { IMeetingDetailsProps } from "./IMeetingDetailsProps";
import MeetingComponent from "./MeetingComponent";

export default class MeetingDetails extends React.Component<
  IMeetingDetailsProps,
  {}
> {
  constructor(prop: IMeetingDetailsProps, state: {}) {
    super(prop);
    sp.setup({
      spfxContext: this.props.context,
    });
  }
  public render(): React.ReactElement<IMeetingDetailsProps> {
    return <MeetingComponent context={sp} />;
  }
}
