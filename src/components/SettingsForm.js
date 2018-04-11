import React, { Component } from 'react'
import {Button, Form, Segment} from "semantic-ui-react";

class SettingsForm extends Component {
  render() {
    return(
      <Form>
        <Segment>
          <Form.Field>
            <label>ID des aktuellen Rennens (für die RadioTour Android App)</label>
            <input placeholder='1000' type="number"/>
          </Form.Field>
          <Form.Field>
            <label>ID der aktuellen Etappe (für die RadioTour Android App)</label>
            <input placeholder='20000' type="number"/>
          </Form.Field>
          <Button primary fluid>Settings updaten</Button>
        </Segment>
      </Form>
    );
  }
}

export default SettingsForm;