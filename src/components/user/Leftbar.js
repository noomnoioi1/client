import { Container, makeStyles, Typography } from "@material-ui/core";
import {
  Bookmark,
  List,
  ExitToApp,
  Home,
  Person,
  PhotoCamera,
  PlayCircleOutline,
  Settings,
  Storefront,
  TabletMac,
} from "@material-ui/icons";

// Router
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    color: "white",
    paddingTop: theme.spacing(10),
    backgroundColor: theme.palette.primary.main,
    position: "sticky",
    top: 0,
    [theme.breakpoints.up("sm")]: {
      backgroundColor: "white",
      color: "#555",
      border: "1px solid #ece7e7",
    },
  },
  item: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginBottom: theme.spacing(3),
      cursor: "pointer",
    },
  },
  icon: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      fontSize: "18px",
    },
  },
  text: {
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const Leftbar = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate("/");
   
  };

  const Hompppp = () => {
   
    navigate("/user/index");
   
  };

  const Pmasd = () => {
    navigate("/user/mawsd");
  };

  return (
    <Container className={classes.container}>
      <div className={classes.item}>
        <Home className={classes.icon} onClick={Hompppp} />
        <Typography className={classes.text} onClick={Hompppp} >หน้าแรก</Typography>
      </div>
     
      <div className={classes.item}>
        <TabletMac className={classes.icon} onClick={Pmasd} />
        <Typography className={classes.text} onClick={Pmasd}>Manage WSD</Typography>
      </div>
    
      {/* <div className={classes.item}>
        <Settings className={classes.icon} />
        <Typography className={classes.text}>Settings</Typography>
      </div> */}
      <div className={classes.item}>
        <ExitToApp className={classes.icon} onClick={logout} />
        <Typography className={classes.text} onClick={logout}>ออกจากระบบ</Typography>
      </div>
    </Container>
  );
};

export default Leftbar;
