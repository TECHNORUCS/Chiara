import * as React from "react";
import { useState, useEffect } from "react";
import styles from "./CardWebpart.module.scss";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { mergeStyles } from "@fluentui/react/lib/Styling";
import { FontIcon } from "@fluentui/react";
import "./style.css";

const NoImage = require("../../../ExternalRef/images/noImage.png");
const CardsComponent = (props: any) => {
  let _items = [];
  const iconStyle = mergeStyles({
    fontSize: 10,
    height: 10,
    width: 10,
    color: "black",
  });
  const [data, setData] = useState(_items);
  useEffect(() => {
    props.context.web.lists
      .getByTitle("CardsContent")
      .items()
      .then((items) => {
        setData(items);
      });
  }, []);
  return (
    <div>
      <div className={styles.container}>
        {data.map((item) => {
          return (
            <div>
              <div className={styles.cardHeading}>
                <div>{item.Title}</div>
              </div>
              <div className={styles.card}>
                <div className={styles.content}>
                  <div className={styles.contentHeading}>
                    {item.contentHeading}...
                  </div>
                  <div className={styles.contentDescription}>
                    {item.contentDescription.length <= 80
                      ? item.contentDescription
                      : item.contentDescription.substring(0, 80) + "..."}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardsComponent;
