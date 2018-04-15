import React, {Component} from "react";
import {Header} from "semantic-ui-react";
import {Helmet} from "react-helmet";

class Import extends Component {
  render() {
    return(
        <div className="App-Content">
          <Helmet>
            <title>Tourlive Admin | Import</title>
          </Helmet>
          <Header as="h1" color='red'>Import</Header>
        </div>
    );
  }
}

export default Import;