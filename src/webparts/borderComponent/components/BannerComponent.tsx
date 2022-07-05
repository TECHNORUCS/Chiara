import * as React from "react";
import { useState, useEffect } from "react";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/folders";
import "@pnp/sp/items";
import "@pnp/sp/sites";
import { mergeStyles, mergeStyleSets } from "@fluentui/react/lib/Styling";
import styles from "./BorderComponent.module.scss";
import "./style.css";

const NoImage = require("../../../ExternalRef/images/noImage.png");
const bannerComponent = (props: any) => {
  let _items = [];

  const iconStyle = mergeStyles({
    fontSize: 10,
    height: 20,
    width: 12,
    color: "black",
    marginTop: "2px",
    marginLeft: "5px",
  });

  const [masterData, setMasterData] = useState(_items);

  useEffect(() => {
    props.context.web.lists
      .getByTitle("BannerContent")
      .items.select("*,Author/Title,Author/EMail")
      .expand("Author")
      .filter("activeNews eq 1")
      .orderBy("Modified", false)
      .get()
      .then((items) => {
        console.log(items);
        console.log(JSON.parse(items[3].bannerImage));
        9;
        setMasterData([...items]);
      });
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.headerSection}>
          <div>eGroupie News</div>
          <div>See All</div>
        </div>
        <div className={styles.contentSection}>
          {masterData.map((data) => {
            data.bannerImage ? JSON.parse(data.bannerImage) : "No Image";
            return (
              <>
                <div className={styles.contentCard}>
                  {[data.keys.join(",")]}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default bannerComponent;
