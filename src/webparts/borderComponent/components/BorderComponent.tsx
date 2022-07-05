import * as React from "react";
import { sp } from "@pnp/sp";
import { IBorderComponentProps } from "./IBorderComponentProps";
import BannerComponent from "./BannerComponent";

export default class BorderComponent extends React.Component<
  IBorderComponentProps,
  {}
> {
  constructor(prop: IBorderComponentProps, state: {}) {
    super(prop);
    sp.setup({
      spfxContext: this.props.context,
    });
  }
  public render(): React.ReactElement<IBorderComponentProps> {
    return <BannerComponent context={sp} />;
  }
}
