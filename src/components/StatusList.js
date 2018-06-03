import React, {Component} from "react";
import {Image, List} from "semantic-ui-react";

class StatusList extends Component {
    render() {
        const {races} = this.props;
        const {status} = this.props;

        return(
            <List selection verticalAlign='middle'>
                {status.length !== 0 && status.map(element => {
                    let race = races.filter(item => {
                        return item.id = element.raceID;
                    });
                    race = race[0];
                    let stage;
                    if (race !== undefined) {
                        stage = race.stages.filter(elem => {
                            return elem.id = element.stageID;
                        });
                        stage = stage[0];
                    }
                    if (race === undefined || stage === undefined) {
                        return (<p>Aktuell sind keine Rennen in der API vorhanden.</p>);
                    }
                    return (
                        <List.Item key={element.raceID + element.stageID}>
                            <Image avatar src='/../gpxIcon.png' />
                            <List.Content>
                                <List.Header>{race.name} | {stage.stageName} {element.status === true ? ("(GPX Daten vorhanden)") : ("(GPX Daten noch nicht vorhanden)")}</List.Header>
                            </List.Content>
                        </List.Item>);
                })}
                {status.length === 0 && <p>Aktuell sind keine Rennen in der API vorhanden.</p>}
            </List>
        );
    }
}

export default StatusList;