import React, {Component} from "react";
import {Header, Button, Segment, Divider, Loader, Form} from "semantic-ui-react";
import {Helmet} from "react-helmet";
import { Redirect } from 'react-router-dom'
import store from '../store'
import * as adminActions from "../actions/adminActions";
import * as importGPXActions from "../actions/importGPXActions";
import * as deleteRaceActions from "../actions/deleteRaceActions";
import Dropzone from 'react-dropzone';

class ImportStatic extends Component {
    constructor() {
        super();

        this.state = {
            updated : false,
            updatedGPX : false,
            updatedDelete : false,
            gpxStage : 0,
        };

        this.initialImport = this.initialImport.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.deleteRace = this.deleteRace.bind(this);
    }

    fetchCnlabSettings() {
        store.dispatch(adminActions.getCnlabInfo());
    }

    fetchCurrentRaces() {
        store.dispatch(adminActions.getRacesAndStagesFromAPI())
    }

    componentDidMount() {
        this.fetchCnlabSettings();
        this.fetchCurrentRaces();
    }

    initialImport(event) {
        event.preventDefault();
        store.dispatch(adminActions.initialImport());
        this.setState({updated: true});
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

    handleInputChange(event) {
        this.setState({
            [event.target.name]: parseInt(event.target.value,10)
        });
    }

    deleteRace(event) {
        event.preventDefault();
        store.dispatch(deleteRaceActions.deleteActualRace());
        this.setState({updatedDelete: true});
    }

    render() {
        const {user} = this.props;
        const {importSettings} = this.props;
        const {cnlab} = this.props;
        const {importGPX} = this.props;
        const {races} = this.props;
        const {del} = this.props;

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

      const deleteRaceCycle = del.loading ? (
        <Segment inverted color='green'>
          <Loader active inline='centered' />
        </Segment>
      ) : (
        del.error !== "" ? (
          <Segment inverted color='red'>
            {del.error}
          </Segment>
        ) : (
          this.state.updatedDelete === true ? (
            <Segment inverted color='green'>
              <p>Das Löschen des Rennens auf der API wurde erfolgreich ausgeführt.</p>
            </Segment>
          ) : (
            <br/>
          )
        )
      );

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

        return(user.loggedIn ? (
                <div className="App-Content">
                    <Helmet>
                        <title>Tourlive Admin | Import von statischen Daten</title>
                    </Helmet>
                    <Header as="h1" color='red'>Import von statischen Daten</Header>
                    <p>Die statischen Daten nur einmal pro Event importiert werden und sind dann jeweils für den gesamten Event gültig.</p>
                    <Header as="h3">Import von Renninformationen</Header>
                    <p>Der Import von Renninformationen (Etappe, Fahrer, Trikiots,...) muss nur einmal pro Rennen (z.B. Tour de Suisse 2018) erfolgen.<br/>
                    Unter dem Menupunkt "Daten in der API" werden die Rennen angezeigt, welche bereits in der API vorhanden sind.<br/>
                    Sollte die ID bereits in dieser Liste vorhanden sein, muss dieses Rennen zuerst gelöscht werden.<br/>
                    Das Löschen einer Etappe ist am Ende dieser Seite zu finden.</p>
                    <p className="bold">Rennen, welches mit diesem Vorgang importiert wird: {cnlab.raceID}</p>
                    {importLoadingCycle}
                    <Button primary fluid onClick={this.initialImport}>Datenimport von der cnlab API</Button>
                    <br/>
                    <br/><Divider />
                    <Header as="h3">Import der GPX Daten (pro Etappe)</Header>
                    <p>Diese Funktion deckt den Import der Routendaten (GPX) ab.<br/>
                    Das Einlesen der GPX Daten kann zu jederzeit erfolgen. Es empfiehlt sich die Daten bereits zu Beginn des Rennens zu aktualisieren.</p>
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
                    <br/>
                    <br/><Divider />
                    <Header as="h3">Löschen des aktuellen Rennens vor der API</Header>
                    <p>Mit dieser Aktion wird das aktuelle Rennen von der API gelöst und damit alle dazugehörigen Daten</p>
                    <p className="bold">Rennen, welches mit diesem Vorgang gelöscht wird: {cnlab.raceID}</p>
                    {deleteRaceCycle}
                    <Button fluid color='red' onClick={this.deleteRace}>Löschen des aktuellen Rennens</Button>
                    <br/>
                </div>

            ) : (
                <Redirect to={{ pathname : '/login'}}/>
            )
        );
    }
}

export default ImportStatic;