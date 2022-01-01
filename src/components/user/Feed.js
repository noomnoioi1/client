import { Container, makeStyles } from "@material-ui/core";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"; // needed for dayClick
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  listEvent,
} from "../../functions/fullcalendar";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
  },
}));



const Feed = () => {
  const classes = useStyles();
  const { user } = useSelector((state) => ({ ...state }));
  const [events, setEvents] = useState([]);
  const [values, setValues] = useState({
    title: "",
    start: "",
    end: "",
    color: "",
    username: "",
  });

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

  useEffect(() => {
    loadData();
  }, []);



  return (
    <Container className={classes.container}>
      <h1>ยินดีตอนรับเข้าสู่ ระบบ วางแผนกำหนดการ ทำงาน(WSD)</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
      />
    </Container>
  );
};

export default Feed;
