import { connect } from 'react-redux';
import RaceList from "../components/RaceList";

function mapStateToProps(store) {
    return {
        races : store.races.data
    }
}

const RaceListContainer = connect(mapStateToProps)(RaceList)

export default RaceListContainer;