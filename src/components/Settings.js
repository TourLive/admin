import React, {Component} from "react";
import DocumentTitle from "react-document-title";
import SettingsForm from "./SettingsForm";
import {Header} from "semantic-ui-react";

class Settings extends Component {
  render() {
    return(
      <DocumentTitle title="Settings Component">
        <div className="Settings">
          <Header as="h1" color='red'>Settings</Header>
          <SettingsForm/>
        </div>
      </DocumentTitle>
    );
  }
}

export default Settings;