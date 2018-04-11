import React, {Component} from "react";
import DocumentTitle from "react-document-title";
import {Header} from "semantic-ui-react";

class NotFound extends Component {
  render() {
    return(
      <DocumentTitle title="Page Not Found">
        <div className="NotFound">
          <Header as="h1" color='red'>Page not found</Header>
          <img src="404.png" alt="404"/>
          <Header as="h3">The page you were looking for was moved or doesn't exist.</Header>
          <p>Let's get you back now</p>
        </div>
      </DocumentTitle>
    );
  }
}

export default NotFound;