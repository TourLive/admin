import React, {Component} from "react";
import SettingsForm from "./SettingsForm";
import {Header} from "semantic-ui-react";
import {Helmet} from "react-helmet";
import {connect} from "react-redux";
import store from "../store"
import * as adminActions from "../actions/adminActions";

class Settings extends Component {
  fetchCurrentSettings() {
    store.dispatch(adminActions.getSettingsFromAPI())
    store.dispatch(adminActions.getRacesAndStagesFromAPI())
  }

  componentDidMount() {
    this.fetchCurrentSettings();
    console.log("Component did mount");
  }

  render() {
    const {settings} = this.props;
    const {races} = this.props;
    console.log(settings);
    console.log(races);
    return(
        <div className="App-Content">
          <Helmet>
            <title>Tourlive Admin | Einstellungen</title>
          </Helmet>
          <Header as="h1" color='red'>Einstellungen</Header>
          <SettingsForm currentData={settings} now={races}/>
        </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    settings: store.settings.data,
    races : store.races.data
  }
}

export default connect(mapStateToProps)(Settings);