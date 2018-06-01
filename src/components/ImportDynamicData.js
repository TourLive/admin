import React, {Component} from "react";
import {Header, Segment, Divider, Loader, Form} from "semantic-ui-react";
import {Helmet} from "react-helmet";
import { Redirect } from 'react-router-dom'
import store from '../store'
import * as adminActions from "../actions/adminActions";
import * as importTimingActions from "../actions/importTimingActions";
import Dropzone from 'react-dropzone';

class ImportDynamicData extends Component {
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

  handleInputChange(event) {
    this.setState({
      [event.target.name]: parseInt(event.target.value,10)
    });
  }

  render() {
    const {user} = this.props;
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
        <Header as="h1" color='red'>Import von dynamischen Daten</Header>
        <p>Diese Daten müssen nach jedem Rennen wieder neu importiert werden. Dabei werden bereits vorhandene Daten übernommen bzw. überschrieben.</p>
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
      </div>

    ) : (
      <Redirect to={{ pathname : '/login'}}/>
    )
    );
  }
}



export default ImportDynamicData;