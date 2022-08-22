import { connect } from "react-redux";
import { JsonForms } from "@jsonforms/react";
import React from "react";
import Grid from "@material-ui/core/Grid";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import { getData, JsonFormsState } from "@jsonforms/core";
import "./App.css";
import createStyles from "@material-ui/core/styles/createStyles";

const styles = createStyles({
  container: {
    padding: "1em"
  },
  title: {
    textAlign: "center",
    padding: "0.25em"
  },
  dataContent: {
    display: "flex",
    justifyContent: "center",
    borderRadius: "0.25em",
    backgroundColor: "#cecece"
  },
  demoform: {
    margin: "auto"
  }
});

export interface AppProps extends WithStyles<typeof styles> {
  dataAsString: string;
}

class App extends React.Component<AppProps, any> {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid
          container
          justify={"center"}
          spacing={24}
          className={classes.container}
        >
          <Grid item sm={8}>
            <div className={classes.demoform}>
              <JsonForms />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state: JsonFormsState) => {
  return { dataAsString: JSON.stringify(getData(state), null, 2) };
};

export default connect(mapStateToProps)(withStyles(styles)(App));
