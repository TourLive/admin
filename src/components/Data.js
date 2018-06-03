import React, {Component} from "react";
import {Header} from "semantic-ui-react";
import {Helmet} from "react-helmet";
import store from "../store"
import * as adminActions from "../actions/adminActions";
import RaceListContainer from "../containers/RaceListContainer";
import StatusListContainer from "../containers/StatusListContainer";

class Data extends Component {
  fetchStatusData() {
    store.dispatch(adminActions.getAllStagesForStatus());
  }

  componentDidMount() {
    this.fetchStatusData();
  }

  render() {
    return(
        <div className="App-Content">
          <Helmet>
            <title>Tourlive Admin | Daten in der API</title>
          </Helmet>
          <Header as="h1" color='red'>Daten in der API</Header>
          <Header as="h3">Vorhandene Rennen in der API</Header>
          <p>Folgende Rennen sind auf der TourLive API bereits vorhanden.</p>
          <RaceListContainer/>
          <Header as="h3">GPX-Daten in der API</Header>
          <p>Die Hinterlegung der GPX-Daten zu den Etappen der Rennen sieht wie folgt aus:</p>
          <StatusListContainer/>
        </div>
    );
  }
}

export default Data;