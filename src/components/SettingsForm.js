import React, { Component } from 'react'
import {Button, Form, Message} from "semantic-ui-react";
import axios from "axios";

class SettingsForm extends Component {
  constructor() {
    super();

    this.state = {
      raceID: 1000,
      stageID: 0,
      races: []
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({raceID: props.currentData.raceID});
    this.setState({stageID: props.currentData.stageID});
    this.setState({races: props.now});
  }

  handleInputChange(event) {
    console.log("HERE");
    this.setState({
      [event.target.name]: parseInt(event.target.value,10)
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    const setting = {
      raceID: this.state.raceID,
      stageID: this.state.stageID
    }

    axios.put("http://prod-api.tourlive.ch/settings", {setting}).then(res => {
      console.log(res);
      console.log(res.data);
    });
  }

  render() {
    //console.log(this.state.races);
    //console.log(this.state.raceID);
    return(
      <Form onSubmit={this.handleSubmit}>
          <Form.Field onChange={this.handleInputChange} control='select' name="raceID">
            <option key={10} value={1000}>Tour de Test</option>
            {this.state.races.map(x => <option key={x.id} value={x.id}>{x.name}</option>)}
          </Form.Field>
          <Form.Field onChange={this.handleInputChange} control='select' name="stageID">
            {this.state.races.filter(item => item.id === this.state.raceID).map(item => {
              console.log(item.stages);
              return (item.stages.map(sub => {
                console.log(sub.stageName);
                return (<option key={sub.id} value={sub.id}>{sub.stageName} ({sub.start} nach {sub.destination}, {sub.stageType})</option>)
              }))
            })}
          </Form.Field>
          <Message
            success
            header='Form Completed'
            content="You're all signed up for the newsletter"
          />
          <Message
            error
            header='Action Forbidden'
            content='You can only sign up for an account once with a given e-mail address.'
          />
          <Button primary fluid>Settings updaten</Button>
      </Form>
    );
  }
}

export default SettingsForm;