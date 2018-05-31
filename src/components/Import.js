import React, {Component} from "react";
import {Header, Button, Segment, Divider, Loader, Form} from "semantic-ui-react";
import {Helmet} from "react-helmet";
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import store from '../store'
import * as adminActions from "../actions/adminActions";
import * as importGPXActions from "../actions/importGPXActions";
import * as importTimingActions from "../actions/importTimingActions";
import Dropzone from 'react-dropzone';

class Import extends Component {
  constructor() {
    super();

    this.state = {
      updated : false,
      updatedGPX : false,
      updatedTiming: false,
      gpxStage : 0,
      timingStage: 0
    };

    this.initialImport = this.initialImport.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  fetchCurrentRaces() {
    store.dispatch(adminActions.getRacesAndStagesFromAPI())
  }

  componentDidMount() {
    this.fetchCurrentRaces();
  }

  onGPXDrop(acceptedFiles, rejectedFiles) {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const fileAsBinaryString = reader.result;
        store.dispatch(importGPXActions.postGPXData(fileAsBinaryString, this.state.gpxStage));
        this.setState({updatedGPX: true});
      };
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');

      reader.readAsText(file, "utf-8");
    });
  }

  onTimingDrop(acceptedFiles, rejectedFiles) {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const fileAsBinaryString = reader.result;
        store.dispatch(importTimingActions.postTimingData(fileAsBinaryString, this.state.timingStage));
        this.setState({updatedTiming: true});
      };
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');

      reader.readAsText(file, "utf-8");
    });
  }

  initialImport(event) {
    event.preventDefault();
    store.dispatch(adminActions.initialImport());
    this.setState({updated: true});
  }

    deleteRace(event) {
        event.preventDefault();
        store.dispatch(adminActions.deleteActualRace());
    }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: parseInt(event.target.value,10)
    });
  }

  render() {
    const {user} = this.props;
    const {importSettings} = this.props;
    const {importGPX} = this.props;
    const {importTiming} = this.props;
    const {races} = this.props;

    const boxStyle = {
      width: '100%',
      height: '6rem',
      borderWidth: '2px',
      borderStyle: 'dashed',
      borderRadius: '5px',
      borderColor: '#6fba1c',
      padding: '1rem',
      fontWeight: "bold",
      backgroundColor: "#6fba1c"
    };

    const importLoadingCycle = importSettings.loading ? (
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

    const importGPXLoadingCycle = importGPX.loading ? (
      <Segment inverted color='green'>
        <Loader active inline='centered' />
      </Segment>
    ) : (
      importGPX.error !== "" ? (
        <Segment inverted color='red'>
          {importGPX.error}
        </Segment>
      ) : (
        this.state.updatedGPX === true ? (
          <Segment inverted color='green'>
            <p>Der Import auf die API wurde erfolgreich ausgeführt.</p>
          </Segment>
        ) : (
          <br/>
        )
      )
    );

    const importTimingLoadingCycle = importTiming.loading ? (
      <Segment inverted color='blue'>
        <Loader active inline='centered' />
      </Segment>
    ) : (
      importTiming.error !== "" ? (
        <Segment inverted color='red'>
          {importTiming.error}
        </Segment>
      ) : (
        this.state.updatedTiming === true ? (
          <Segment inverted color='green'>
            <p>Der Import auf die API wurde erfolgreich ausgeführt.</p>
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
        {importLoadingCycle}
        <Button primary fluid onClick={this.initialImport}>Initale Daten von der cnlab API holen</Button>
        <br/><Divider />
          <Header as="h3">Löschen der vorhandenen Daten von der API</Header>
          <p>Nur auszuführen, falls das Rennen bereits in der Datenbank vorhanden ist. Die Anwendung weist Sie entsprechend darauf hin.</p>

          <Button primary fluid onClick={this.deleteRace}>Bestehende Daten von der API löschen</Button>
          <br/><Divider />
        <Header as="h3">Import der aktuellen Daten vom Zeitnehmer Matsport (pro Etappe)</Header>
        <p>Nach jedem Rennen stehen vom offiziellen Zeitnehmer die aktuellen (korrekten) Daten zur Verfügung. Diese Daten werden mit diesem Schritt eingelesen.</p>
        <p>Dabei werden die Daten der vergangenen Etappe überschrieben. Zudem wir die nächste Etappe mit diesen Daten vorbefüllt.</p>
        <p>Zuerst die Etappe eines Rennes angeben und dann die Datei mit Drag & Drop einfügen</p>
        {importTimingLoadingCycle}
        <Form>
          <Form.Field onChange={this.handleInputChange} label="Etappe" control='select' name="timingStage">
            <option key="0" value="0">---</option>
            {races.map(item => {
              return (item.stages.map(sub => {
                return (<option key={sub.id} value={sub.id}>{item.name} | {sub.stageName} ({sub.start} nach {sub.destination}, {sub.stageType})</option>)
              }))
            })}
          </Form.Field>
        </Form>
        <br/>
        <Dropzone style={boxStyle} onDrop={(accepted, rejected) => {this.onTimingDrop(accepted, rejected)}}>
            <p>Dateien hier hineinziehen. Zuvor die entsprechende Etappe auswählen.</p>
            <p>Für den Import werden .xml-Dateien vorausgesetzt.</p>
        </Dropzone>
        <br/><Divider />
        <Header as="h3">Import der GPX Daten (pro Etappe)</Header>
        <p>Nach jedem Rennen stehen vom offiziellen Zeitnehmer die aktuellen (korrekten) Daten zur Verfügung. Diese Daten werden mit diesem Schritt eingelesen.</p>
        <p>Die Aktualisierung der GPX Daten kann zu jederzeit erfolgen. Es empfiehlt sich die Daten bereits zu Beginn des Rennens zu aktualisieren.</p>
        {importGPXLoadingCycle}
        <Form>
          <Form.Field onChange={this.handleInputChange} label="Etappe" control='select' name="gpxStage">
            <option key="0" value="0">---</option>
            {races.map(item => {
              return (item.stages.map(sub => {
                return (<option key={sub.id} value={sub.id}>{item.name} | {sub.stageName} ({sub.start} nach {sub.destination}, {sub.stageType})</option>)
              }))
            })}
          </Form.Field>
        </Form>
        <br/>
        <Dropzone style={boxStyle} onDrop={(accepted, rejected) => {this.onGPXDrop(accepted, rejected)}}>
          <p>Dateien hier hineinziehen. Zuvor die entsprechende Etappe auswählen.</p>
          <p>Für den Import werden .xml-Dateien vorausgesetzt.</p>
        </Dropzone>
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
    importSettings : store.import,
    importGPX : store.importGPX,
    importTiming : store.importTiming,
    races : store.races.data
  }
}

export default connect(mapStateToProps)(Import);