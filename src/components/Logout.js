import React, {Component} from "react";
import {Header, Button} from "semantic-ui-react";
import {Helmet} from "react-helmet";
import store from "../store";
import * as adminActions from "../actions/adminActions";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";


class Logout extends Component {
    constructor() {
        super();

        this.doLogout = this.doLogout.bind(this);
    }
    doLogout() {
        store.dispatch(adminActions.logout());
    }
    render() {
        const {user} = this.props;
        return(
            user.loggedIn ? (
                <div className="App-Content">
                    <Helmet>
                        <title>Tourlive Admin | Logout</title>
                    </Helmet>
                    <Header as="h1" color='red'>Logout</Header>
                    <p>Um sich aus der Admin Anwendung ausloggen, drücken sie bitte den untenstehen Button</p>
                    <p>Bis zum nächsten Mal</p>
                    <Button primary fluid onClick={this.doLogout}>Logout</Button>
                </div>
                ) : (
                <Redirect to={{ pathname : '/login'}}/>
            )
        )
    }
}

function mapStateToProps(store) {
    return {
        user: store.user
    }
}

export default connect(mapStateToProps)(Logout);