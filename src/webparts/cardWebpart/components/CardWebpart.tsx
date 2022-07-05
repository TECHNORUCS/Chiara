import * as React from "react";
import { sp } from "@pnp/sp";
import { ICardWebpartProps } from "./ICardWebpartProps";
import CardsComponent from "./CardsComponent";

export default class CardWebpart extends React.Component<
  ICardWebpartProps,
  {}
> {
  constructor(prop: ICardWebpartProps, state: {}) {
    super(prop);
    sp.setup({
      spfxContext: this.props.context,
    });
  }
  public render(): React.ReactElement<ICardWebpartProps> {
    return <CardsComponent context={sp} />;
  }
}
