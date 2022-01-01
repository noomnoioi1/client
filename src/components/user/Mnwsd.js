import { Container, makeStyles, Grid, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"; // needed for dayClick
import ModaddDate from "./ModaddDate";
import { useSelector } from "react-redux";
import "./mnwsd.css";
// Antd
import "antd/dist/antd.css";
import { Modal, Card, Tag } from "antd";

import moment from "moment";
// Functions
import {
  createEvent,
  listEvent,
  handleCurrentMonth,
  updateEvent,
} from "../../functions/fullcalendar";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: 450,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Mnwsd = () => {
  const classes = useStyles();
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  // console.log(user.username);

  const [values, setValues] = useState({
    title: "",
    start: "",
    end: "",
    color: "",
    username: "",
  });
  const sdlc = [
    { id: "1", name: "รวบรวมข้อมูล/ปัญหา", color: "#F45A14" },
    { id: "2", name: "วิเคราะห์", color: "#F4BF14" },
    { id: "3", name: "ออกกแบบ", color: "#B914F4" },
    { id: "4", name: "พัฒนาระบบ", color: "#14BCF4" },
    { id: "5", name: "ทดสอบระบบ/แก้ไข", color: "#F4F214" },
    { id: "6", name: "ติดตั้ง(GoLive)", color: "#14F436" },
    { id: "7", name: "บำรุงรักษา", color: "#6495ED" },
  ];

  useEffect(() => {
    loadData();
    drag();
  }, []);
  const loadData = () => {
    const pname = {
      username: user.username,
    };
    // console.log(pname);
    listEvent(pname)
      .then((res) => {
        // console.log(res.data);
        setEvents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const drag = () => {
    let dragable = document.getElementById("external-event");
    new Draggable(dragable, {
      itemSelector: ".fc-event",
      eventData: function (eventEl) {
        let id = eventEl.getAttribute("id");
        let title = eventEl.getAttribute("title");
        let color = eventEl.getAttribute("color");

        return {
          id: id,
          title: title,
          color: color,
        };
      },
    });
  };

  const handleRecieve = (eventInfo) => {
    console.log(eventInfo);
    let value = {
      id: eventInfo.draggedEl.getAttribute("id"),
      title: eventInfo.draggedEl.getAttribute("title"),
      color: eventInfo.draggedEl.getAttribute("color"),
      start: eventInfo.dateStr,
      username: user.username,
      end: moment(eventInfo.dateStr)
        .add(+1, "days")
        .format("YYYY-MM-DD"),
    };
    console.log("value", value);
    createEvent(value)
      .then((res) => {
        // loadData()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const currentMonth = (info) => {
    //console.log(info);
    const m = info.view.calendar.currentDataManager.data.currentDate;
    const mm = moment(m).format("M");
    handleCurrentMonth({ mm })
      .then((res) => {
        setCurrentEvent(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSelect = (info) => {
    console.log(info);
    showModal();
    setValues({
      ...values,
      start: info.startStr,
      end: info.endStr,
      username: user.username,
    });

    console.log(values);
  };

  const handleChange = (info) => {
    //console.log(info.event._def.extendedProps._id)
    // console.log(info.event.startStr, info.event.endStr)
    const values = {
      id: info.event._def.extendedProps._id,
      start: info.event.startStr,
      end: info.event.endStr,
    };
    updateEvent(values)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    console.log(values);
    createEvent(values)
      .then((res) => {
        setValues({ ...values, title: "" });
        loadData();
      })
      .catch((err) => {
        console.log(err);
      });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onChangeValues = (e) => {
    console.log(e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  console.log(currentEvent);

  const d = moment(new Date()).format("DD/MM/YYYY");
  const r = new Date(); //วันที่ปันจุบัน
  const filterDate = currentEvent.filter((item) => {
    return d == moment(item.start).format("DD/MM/YYYY");
  });

  //filter คือ การค้นหาหรือสอบถามข้อมูลใน [{}]
  const betweenDate = currentEvent.filter((item) => {
    return r >= moment(item.start) && r < moment(item.end);
  });
  console.log("between", betweenDate);
  // window.location.reload();

  return (
    <Container className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Card>
            <div id="external-event">
              <ul>
                {sdlc.map((item, index) => (
                  <li
                    className="fc-event"
                    id={item.id}
                    title={item.name}
                    color={item.color}
                    key={index}
                    style={{ backgroundColor: item.color }}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
          <Card>
            <ol>
              {currentEvent.map((item, index) => (
                <li key={index}>
                  {d == moment(item.start).format("DD/MM/YYYY") ? (
                    <>
                      {moment(item.start).format("DD/MM/YYYY") +
                        "-" +
                        item.title}
                      <Tag color="green">วันนี้</Tag>
                    </>
                  ) : r >= moment(item.start) && r < moment(item.end) ? (
                    <>
                      {moment(item.start).format("DD/MM/YYYY") +
                        "-" +
                        item.title}
                      <Tag color="yellow">อยู่ระหว่างดำเนินการ</Tag>
                    </>
                  ) : (
                    <>
                      {moment(item.start).format("DD/MM/YYYY") +
                        "-" +
                        item.title}
                    </>
                  )}
                </li>
              ))}
            </ol>
          </Card>
        </Grid>
        <Grid item xs={9}>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            selectable={true}
            select={handleSelect}
            events={events}
            drop={handleRecieve}
            datesSet={currentMonth}
            editable={true}
            eventChange={handleChange}
          />
        </Grid>
        <Modal
          title="รายการ"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <input name="title" value={values.title} onChange={onChangeValues} />
          <select name="color" onChange={onChangeValues}>
            <option key={999} value="">
              --กรุณาเลือก--
            </option>
            {sdlc.map((item, index) => (
              <option
                key={index}
                value={item.color}
                style={{ backgroundColor: item.color }}
              >
                {item.name}
              </option>
            ))}
          </select>
        </Modal>
      </Grid>
    </Container>
  );
};

export default Mnwsd;
