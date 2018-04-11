import React, {Component} from "react";
import DocumentTitle from "react-document-title";
import {Header} from "semantic-ui-react";

class Import extends Component {
  render() {
    return(
      <DocumentTitle title="Import Component">
        <div className="Import">
          <Header as="h1" color='red'>Import</Header>
        </div>
      </DocumentTitle>
    );
  }
}

export default Import;