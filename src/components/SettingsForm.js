import React, { Component } from 'react'
import {Button, Form, Message, Label} from "semantic-ui-react";
import store from "../store"
import * as adminActions from "../actions/adminActions";

class SettingsForm extends Component {
  constructor() {
    super();

    this.state = {
      raceID: 1000,
      stageID: 0,
      races: [],
      updated : false,
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({raceID: props.settings.raceID});
    this.setState({stageID: props.settings.stageID});
    this.setState({races: props.races});
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: parseInt(event.target.value,10)
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const setting = {
      raceID: this.state.raceID,
      stageID: this.state.stageID
    };

    store.dispatch(adminActions.putSettings(setting));
    this.setState({updated: true});
  }

  render() {
    return(
      <Form success={store.getState().settings.error === false && this.state.updated === true} error={store.getState().settings.error === true} onSubmit={this.handleSubmit}>
          <Message
            success
            header='Einstellungen gespeichert'
            content="Die Einstellungen wurden erfolgreich gespeichert. "
          />
          <Message
            error
            header='Speichern fehlgeschlagen'
            content='Das Speichern der Einstellungen ist fehlgeschlagen. Versuchen Sie es später erneut und prüfen Sie die Umsysteme (API) auf Fehler.'
          />
          <Form.Field onChange={this.handleInputChange} control='select' name="raceID" value={this.state.raceID} label="Aktuelles Rennen">
            {this.state.races.map(x => <option key={x.id} value={x.id}>{x.name}</option>)}
          </Form.Field>
          <Form.Field onChange={this.handleInputChange} label="Aktuelle Etappe" control='select' name="stageID" value={this.state.stageID}>
            {this.state.races.filter(item => item.id === this.state.raceID).map(item => {
              return (item.stages.map(sub => {
                return (<option key={sub.id} value={sub.id}>{sub.stageName} ({sub.start} nach {sub.destination}, {sub.stageType})</option>)
              }))
            })}
          </Form.Field>
          <Button primary fluid>Einstellungen speichern</Button>
      </Form>
    );
  }
}

export default SettingsForm;