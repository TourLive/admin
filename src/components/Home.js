import React, {Component} from "react";
import {Header} from "semantic-ui-react";
import {Helmet} from "react-helmet";

class Home extends Component {
  render() {
    return(
        <div className="App-Content">
          <Helmet>
            <title>Tourlive Admin | Home</title>
          </Helmet>
          <Header as="h1" color='red'>Home</Header>
          <p>Diese Administrationsanwendung dient zur Verwaltung der Tourlive API, welche im Rahmen des Tourlive Systems verwendet wird.</p>
          <Header as="h3">Kontakt</Header>
          <p>Patrick Eichler, cnlab AG</p>
          <Header as="h3">Impressum</Header>
          <p>Diese Administrationsanwendung für die TourLive API wurde von Dominik Good und Urs Forrrer 2018 im Rahmen einer Bachelorarbeit an der HSR Hochschule für Technik Rapperswil entwickelt.</p>
          <p>Sie wird an der Tour de Suisse 2018 erstmals in den Einsatz kommen und von cnlab betreut und weiterentwickelt werden.</p>
          <Header as="h3">Copyright</Header>
          <p>Diese Website und alle dazugehörigen Texte, Grafiken, Logos sowie andere Materialien und das Design sind urheberrechtlich geschützt.</p>
          <p>Jegliche Verwendung ohne vorherige schriftliche Zustimmung durch den Webmaster der Seite ist nicht gestattet.</p>
        </div>
    );
  }
}

export default Home;