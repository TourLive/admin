import React, {Component} from "react";
import SettingsForm from "./SettingsForm";
import {Header} from "semantic-ui-react";
import {Helmet} from "react-helmet";

class Settings extends Component {
  render() {
    return(
        <div className="App-Content">
          <Helmet>
            <title>Tourlive Admin | Einstellungen</title>
          </Helmet>
          <Header as="h1" color='red'>Einstellungen</Header>
          <SettingsForm/>
        </div>
    );
  }
}

export default Settings;