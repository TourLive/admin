import React, {Component} from "react";
import {Image, List} from "semantic-ui-react";

class RaceList extends Component {
    render() {
        const {races} = this.props;
        console.log(races);
        return(
            <List selection verticalAlign='middle'>
                {races.length !== 0 && races.map((element, i) => {
                      if (element === undefined) {
                        return (<p>Aktuell sind keine Rennen in der API vorhanden.</p>);
                      }
                    return (
                            <List.Item key={i}>
                                <Image avatar src='/../raceIcon.png' />
                                <List.Content>
                                    <List.Header>ID {element.id} | {element.name}</List.Header>
                                </List.Content>
                    </List.Item>);
                })}
                {races.length === 0 && <p>Aktuell sind keine Rennen in der API vorhanden.</p>}
            </List>
        );
    }
}

export default RaceList;