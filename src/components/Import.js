import React, {Component} from "react";
import {Header, Button, Form, Message, Segment, Divider, Loader} from "semantic-ui-react";
import {Helmet} from "react-helmet";
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import store from '../store'
import * as adminActions from "../actions/adminActions";

class Import extends Component {
  constructor() {
    super();

    this.state = {
      updated : false
    };

    this.initialImport = this.initialImport.bind(this);
  }

  initialImport(event) {
    event.preventDefault();
    store.dispatch(adminActions.initialImport());
    this.setState({updated: true});
  }

  render() {
    const {user} = this.props;
    const {importSettings} = this.props;

    const loadingCycle = importSettings.loading ? (
      <Segment inverted color='grey'>
        <Loader active inline='centered' />
      </Segment>
    ) : (
      importSettings.error !== "" ? (
        <Segment inverted color='red'>
          {importSettings.error}
        </Segment>
      ) : (
        this.state.updated === true ? (
          <Segment inverted color='green'>
            <p>Der Import auf die API wurde erfolgreich ausgeführt. Bitte nicht vergessen die Einstellungen zu ändern.</p>
          </Segment>
        ) : (
          <br/>
        )
      )
    );

    return(user.loggedIn ? (
      <div className="App-Content">
        <Helmet>
          <title>Tourlive Admin | Import</title>
        </Helmet>
        <Header as="h1" color='red'>Import</Header>
        <Header as="h3">Import der initalen Daten von der cnlab API</Header>
        <p>Dieser Schritt muss nur zu Beginn einer Verantstaltung (z.B. Tour de Suisse) durchgeführt werden.</p>
        {loadingCycle}
        <Button primary fluid onClick={this.initialImport}>Initale Daten von der cnlab API holen</Button>
        <br/><Divider />
        <Header as="h3">Import der aktuellen Daten vom Zeitnehmer Matsport (pro Etappe)</Header>
        <p>Nach jedem Rennen stehen vom offiziellen Zeitnehmer die aktuellen (korrekten) Daten zur Verfügung. Diese Daten werden mit diesem Schritt eingelesen.</p>
        <p>Dabei werden die Daten der vergangenen Etappe überschrieben. Zudem wir die nächste Etappe mit diesen Daten vorbefüllt.</p>
        <Form>
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
          <Button primary fluid>Matsport XML hochladen und in API importieren</Button>
        </Form>
        <br/><Divider />
        <Header as="h3">Import der GPX Daten (pro Etappe)</Header>
        <p>Nach jedem Rennen stehen vom offiziellen Zeitnehmer die aktuellen (korrekten) Daten zur Verfügung. Diese Daten werden mit diesem Schritt eingelesen.</p>
        <p>Die Aktualisierung der GPX Daten kann zu jederzeit erfolgen. Es empfiehlt sich die Daten bereits zu Beginn des Rennens zu aktualisieren.</p>
        <Form>
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
            <Button primary fluid>GPX XML hochladen und in API importieren</Button>
        </Form>
      </div>

    ) : (
      <Redirect to={{ pathname : '/login'}}/>
    )
    );
  }
}

function mapStateToProps(store) {
  return {
    user: store.user,
    importSettings : store.import
  }
}

export default connect(mapStateToProps)(Import);