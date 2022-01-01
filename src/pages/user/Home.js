import { Grid, makeStyles } from "@material-ui/core";
import Add from "../../components/user/Add";
import Feed from "../../components/user/Feed";
import Leftbar from "../../components/user/Leftbar";
import Navbar from "../../components/user/Navbar";
import Rightbar from "../../components/user/Rightbar";

const useStyles = makeStyles((theme) => ({
    right: {
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
  }));

function Home() {
    const classes = useStyles();
    return (
        <div>
        <Navbar />
        <Grid container>
          <Grid item sm={2} xs={2}>
            <Leftbar />
          </Grid>
          <Grid item sm={7} xs={10}>
            <Feed />
          </Grid>
          <Grid item sm={3} className={classes.right}>
            <Rightbar />
          </Grid>
        </Grid>
        <Add />
      </div>
    )
}

export default Home
