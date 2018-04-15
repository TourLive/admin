import React, {Component} from "react";
import {Header} from "semantic-ui-react";
import {Helmet} from "react-helmet";

class NotFound extends Component {
  render() {
    return(
      <div className="NotFound">
        <Helmet>
          <title>Tourlive Admin | 404 Not Found</title>
        </Helmet>
        <Header as="h1" color='red'>Page not found</Header>
        <img src="404.png" alt="404"/>
        <Header as="h3">The page you were looking for was moved or doesn't exist.</Header>
        <p>Let's get you back now</p>
       </div>
    );
  }
}

export default NotFound;