import * as React from "react";
import { useState, useEffect } from "react";
import styles from "./MeetingDetails.module.scss";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import "@pnp/sp/items";
import "@pnp/sp/sites";
import { mergeStyles, mergeStyleSets } from "@fluentui/react/lib/Styling";
import {
  Label,
  ILabelStyles,
  DetailsList,
  DetailsListLayoutMode,
  IDetailsListStyles,
  FontIcon,
  SelectionMode,
} from "@fluentui/react";
import { FileIcon, defaultStyles } from "react-file-icon";
import "./style.css";

const iconClass = mergeStyles({
  fontSize: 20,
  height: 20,
  width: 20,
});

const classNames = mergeStyleSets({
  file: [
    {
      color: "black",
      cursor: "pointer",
    },
    iconClass,
  ],
  black: [
    {
      color: "black",
      marginLeft: "10px",
    },
    iconClass,
  ],
  blackDownloadIcon: [{ color: "black", marginLeft: "10px" }, iconClass],
});

const detailListStyle: Partial<IDetailsListStyles> = {
  root: {
    borderRadius: "5px",
    margin: "5px",
  },
  contentWrapper: {
    color: "white",
  },
};
const labelStyle: Partial<ILabelStyles> = {
  root: {
    color: "white",
    fontSize: "20px",
    paddingLeft: "10px",
  },
};

const meetingComponent = (props: any) => {
  let _allItems = [];
  let _allFiles: any = [];
  let _columns = [
    {
      key: "Title",
      name: "Title",
      fieldName: "Title",
      minWidth: 130,
      maxWidth: 130,
      resizable: true,
    },
    {
      key: "Date",
      name: "Date",
      fieldName: "Date",
      minWidth: 70,
      maxWidth: 70,
    },
    {
      key: "Files",
      name: "Files",
      fieldName: "Files",
      minWidth: 200,
      maxWidth: 200,
    },
    {
      key: "",
      name: "",
      fieldName: "",
      minWidth: 0,
      maxWidth: 0,
    },
  ];
  const [items, setItems] = useState(_allItems);
  const [showIndex, setShowIndex] = useState(null);
  const [reRender, setReRender] = useState(true);

  function handleClick(index: number, condition: boolean) {
    let _index = index;
    let _condition = condition;
    if (_condition) {
      setShowIndex(_index);
      setReRender(true);
    } else {
      setShowIndex(null);
      setReRender(true);
    }
  }

  useEffect(() => {
    setReRender(false);
    props.context.web.lists
      .getByTitle("MeetingDetails")
      .items.orderBy("Modified", false)
      .get()
      .then((items) => {
        props.context.web
          .getFolderByServerRelativePath(`MeetingFiles`)
          .folders.expand("Files,ListItemAllFields")
          .get()
          .then((_files) => {
            _files.forEach((file) => {
              if (file.Name != "Forms") {
                _allFiles.push({
                  files: [...file.Files],
                  fileName: file.Name,
                  refId: file.ListItemAllFields.ReferenceIDId,
                });
              }
            });
            for (let i = 0; i < items.length; i++) {
              let item = items[i];
              let index = i;
              let fileIdx = _allFiles.findIndex((object) => {
                return item.ID == object.refId;
              });
              if (fileIdx != -1 && _allFiles[fileIdx].files.length > 0) {
                _allItems.push({
                  Title: item.Title,
                  Date: new Date(item.Date).toLocaleDateString("en-us", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }),
                  Files: (
                    <>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                          }}
                        >
                          {_allFiles[fileIdx].files.map((temp) => {
                            let fileType = temp.ServerRelativeUrl.split(".")[1];
                            return (
                              <>
                                <div
                                  style={{
                                    height: "20px",
                                    width: "20px",
                                    marginLeft: "5px",
                                  }}
                                >
                                  <a href="#">
                                    <FileIcon
                                      extension={fileType}
                                      {...(fileType == "docx" ||
                                      fileType == "doc"
                                        ? { ...defaultStyles.doc }
                                        : fileType == "pptx" ||
                                          fileType == "ppt"
                                        ? { ...defaultStyles.ppt }
                                        : fileType == "xlsx" ||
                                          fileType == "xls"
                                        ? { ...defaultStyles.xls }
                                        : fileType == "png" ||
                                          fileType == "jpeg"
                                        ? { ...defaultStyles.jpeg }
                                        : fileType == "mp4" || fileType == "avi"
                                        ? { ...defaultStyles.jpeg }
                                        : "")}
                                    />
                                  </a>
                                </div>
                              </>
                            );
                          })}
                        </div>
                        <div>
                          {showIndex == index ? (
                            <a href="#">
                              <FontIcon
                                aria-Label="ChevronDownSmall"
                                iconName="ChevronDownSmall"
                                className={classNames.black}
                                onClick={() => {
                                  handleClick(index, false);
                                }}
                              />
                            </a>
                          ) : (
                            <a href="#">
                              <FontIcon
                                aria-Label="ChevronRightSmall"
                                iconName="ChevronRightSmall"
                                className={classNames.black}
                                onClick={() => {
                                  handleClick(index, true);
                                }}
                              />
                            </a>
                          )}
                        </div>
                      </div>
                    </>
                  ),
                });
                {
                  if (showIndex == index) {
                    {
                      true
                        ? _allFiles[fileIdx].files.forEach((tempFiles) => {
                            let fileType =
                              tempFiles.ServerRelativeUrl.split(".")[1];
                            _allItems.push({
                              Title: tempFiles.Name,
                              Date: new Date(item.Date).toLocaleDateString(
                                "en-us",
                                {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                }
                              ),
                              Files: (
                                <div>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <div
                                      style={{
                                        height: "20px",
                                        width: "20px",
                                        marginLeft: "5px",
                                      }}
                                    >
                                      <a href="#">
                                        <FileIcon
                                          extension={fileType}
                                          {...(fileType == "docx" ||
                                          fileType == "doc"
                                            ? { ...defaultStyles.doc }
                                            : fileType == "pptx" ||
                                              fileType == "ppt"
                                            ? { ...defaultStyles.ppt }
                                            : fileType == "xlsx" ||
                                              fileType == "xls"
                                            ? { ...defaultStyles.xls }
                                            : fileType == "png" ||
                                              fileType == "jpeg"
                                            ? { ...defaultStyles.jpeg }
                                            : fileType == "mp4" ||
                                              fileType == "avi"
                                            ? { ...defaultStyles.jpeg }
                                            : "")}
                                        />
                                      </a>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        marginLeft: "40px",
                                      }}
                                    >
                                      <div>
                                        <a
                                          href={`https://${window.location.host}${tempFiles.ServerRelativeUrl}?web=1`}
                                          data-interception="off"
                                          target="_blank"
                                        >
                                          <FontIcon
                                            aria-Label="View"
                                            iconName="View"
                                            className={classNames.file}
                                          />
                                        </a>
                                      </div>
                                      <div>
                                        <a
                                          href={`https://${window.location.host}${tempFiles.ServerRelativeUrl}`}
                                        >
                                          <FontIcon
                                            aria-Label="Download"
                                            iconName="Download"
                                            className={
                                              classNames.blackDownloadIcon
                                            }
                                          />
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ),
                            });
                          })
                        : "No Data Found !!!";
                    }
                  }
                }
              } else {
                _allItems.push({
                  Title: item.Title,
                  Date: new Date(item.Date).toLocaleDateString("en-us", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }),
                  Files: <div style={{ textAlign: "center" }}>No Files</div>,
                });
              }
            }
            setItems(_allItems);
          });
      });
  }, [reRender]);
  return (
    <>
      <div className={styles.containerCover}>
        <Label styles={labelStyle}>eGroupie Download Area</Label>
        <div style={{ height: "270px" }}>
          <DetailsList
            items={items}
            columns={_columns}
            setKey="set"
            styles={detailListStyle}
            layoutMode={DetailsListLayoutMode.justified}
            selectionMode={SelectionMode.none}
            className={styles.details}
          />
        </div>
      </div>
    </>
  );
};

export default meetingComponent;
