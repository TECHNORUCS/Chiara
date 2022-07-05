import * as React from "react";
import { useState, useEffect } from "react";
import styles from "./CalenderWebpart.module.scss";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { Calendar } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import "./Bootstrap.js";
import "./Bootstrap.css";
import "./style.css";

const CalenderComponent = (props: any) => {
  let _Calendar;
  let _calendarData = [];
  let today =
    new Date().getFullYear() +
    "-" +
    ("0" + (new Date().getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + new Date().getDate()).slice(-2);

  const [ViewItems, setViewItems] = useState(_calendarData);
  const [selectedDate, setSelectedDate] = useState(today);

  useEffect(() => {
    props.context.web.lists
      .getByTitle("CalenderContent")
      .items()
      .then((items) => {
        items.forEach((item) => {
          _calendarData.push({
            title: item.Title,
            display: "background",
            start:
              new Date(item.Date).getFullYear() +
              "-" +
              ("0" + (new Date(item.Date).getMonth() + 1)).slice(-2) +
              "-" +
              ("0" + new Date(item.Date).getDate()).slice(-2),
            fullDate: new Date(item.Date).toLocaleDateString("en-us", {
              year: "numeric",
              month: "long",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            }),
          });
        });
        setViewItems([..._calendarData]);
        setTimeout(() => BindCalender(), 1000);
      });
  }, []);

  function BindCalender() {
    var calendarEl = document.getElementById("myCalendar");
    _Calendar = new Calendar(calendarEl, {
      plugins: [
        interactionPlugin,
        dayGridPlugin,
        timeGridPlugin,
        listPlugin,
        bootstrap5Plugin,
      ],
      selectable: true,
      dateClick: (info) => {
        let selected =
          new Date(info.dateStr).getFullYear() +
          "-" +
          ("0" + (new Date(info.dateStr).getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + new Date(info.dateStr).getDate()).slice(-2);
        setSelectedDate(selected);
      },
      themeSystem: "bootstrap5",
      buttonText: {
        prev: "<",
        next: ">",
        today: "Today",
        dayGridMonth: "Month",
      },
      headerToolbar: {
        left: "prev today",
        center: "title",
        right: "dayGridMonth next",
      },
      initialDate: new Date(),
      events: ViewItems,
      height: "auto",
    });
    _Calendar.updateSize();
    _Calendar.render();
  }

  return (
    <div className={styles.container}>
      <div
        className="row"
        style={{
          backgroundColor: "#223458",
          borderRadius: "5px 5px 0px 0px",
        }}
      >
        <div className={styles.calenderHeading}>eGroupie Events</div>
      </div>
      <div
        className="row"
        style={{ backgroundColor: "#223458", borderRadius: "0px 0px 5px 5px" }}
      >
        <div className="calendar-section col-5" style={{ padding: "10px" }}>
          <div id="myCalendar" className={styles.myCalendar}></div>
        </div>
        <div
          className="col-7"
          style={{
            height: "262px",
            borderRadius: "5px",
            backgroundColor: "#F9F3EC",
            margin: " 10px 10px 10px -10px",
            paddingTop: "10px",
            overflowX: "hidden",
            overflowY: "visible",
          }}
        >
          <div>
            <div
              style={{
                color: "#364672",
                fontWeight: "bold",
                fontSize: "16px",
                marginBottom: "20px",
              }}
            >
              Events :
            </div>
            {ViewItems.map((event) => {
              if (selectedDate == event.start) {
                return (
                  <>
                    <div>
                      <div className={styles.list}>
                        <li>
                          <span>{event.title}</span>
                        </li>
                        <div>
                          <span className={styles.listDate}>
                            {event.fullDate}
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalenderComponent;
