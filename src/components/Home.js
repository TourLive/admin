import React, {Component} from "react";
import DocumentTitle from "react-document-title";
import {Header} from "semantic-ui-react";

class Home extends Component {
  render() {
    return(
      <DocumentTitle title="Home Component">
        <div className="Home">
          <Header as="h1" color='red'>Home</Header>
        </div>
      </DocumentTitle>
    );
  }
}

export default Home;