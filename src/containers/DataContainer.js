import { connect } from 'react-redux';
import Data from "../components/Data";

function mapStateToProps(store) {
    return {

    }
}

const DataContainer = connect(mapStateToProps)(Data);

export default DataContainer;