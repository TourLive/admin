import { connect } from 'react-redux';
import StatusList from "../components/StatusList";

function mapStateToProps(store) {
    return {
        races : store.races.data,
        status: store.status.data
    }
}

const StatusListContainer = connect(mapStateToProps)(StatusList);

export default StatusListContainer;