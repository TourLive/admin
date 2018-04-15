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
        </div>
    );
  }
}

export default Home;