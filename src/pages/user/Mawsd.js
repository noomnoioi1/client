import { Grid, makeStyles } from "@material-ui/core";
import Mnwsd from "../../components/user/Mnwsd";
import Leftbar from "../../components/user/Leftbar";
import Navbar from "../../components/user/Navbar";

const useStyles = makeStyles((theme) => ({
    right: {
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
  }));

function Mawsd() {
    const classes = useStyles();
    return (
        <div>
        <Navbar />
        <Grid container>
          <Grid item sm={2} xs={2}>
            <Leftbar />
          </Grid>
          <Grid item sm={10} xs={10}>
            <Mnwsd />
          </Grid>
        </Grid>
      </div>
    )
}

export default Mawsd
