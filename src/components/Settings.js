import React, {Component} from "react";
import SettingsForm from "./SettingsForm";
import {Header} from "semantic-ui-react";
import {Helmet} from "react-helmet";
import {connect} from "react-redux";
import store from "../store"
import * as adminActions from "../actions/adminActions";

class Settings extends Component {
  fetchCurrentSettings() {
    store.dispatch(adminActions.getSettingsFromAPI());
    store.dispatch(adminActions.getRacesAndStagesFromAPI());
  }

  componentDidMount() {
    this.fetchCurrentSettings();
  }

  render() {
    const {settings} = this.props;
    const {races} = this.props;
    
    return(
        <div className="App-Content">
          <Helmet>
            <title>Tourlive Admin | Einstellungen</title>
          </Helmet>
          <Header as="h1" color='red'>Einstellungen</Header>
          <Header as="h3">Beschreibung</Header>
          <p>Diese Einstellungen geben an, welche Etappe und Rennen in der Tablet Anwendung (RadioTour Speaker) sowie in Webanwendung (Zuschauer) verwendet wird.</p>
          <p>Nach jeder Etappe muss diese Einstellung gewechselt werden.</p>
          <SettingsForm settings={settings} races={races}/>
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