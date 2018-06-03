import { connect } from 'react-redux';
import ImportDynamicData from "../components/ImportDynamicData";

function mapStateToProps(store) {
    return {
        user: store.user,
        importSettings : store.import,
        importGPX : store.importGPX,
        importTiming : store.importTiming,
        races : store.races.data
    }
}

const ImportDynamicDataContainer = connect(mapStateToProps)(ImportDynamicData)

export default ImportDynamicDataContainer;