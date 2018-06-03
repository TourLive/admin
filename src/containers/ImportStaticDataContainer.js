import { connect } from 'react-redux';
import ImportStaticData from "../components/ImportStaticData";

function mapStateToProps(store) {
    return {
        user: store.user,
        importSettings : store.import,
        cnlab : store.cnlab,
        importGPX : store.importGPX,
        races : store.races.data,
        del : store.delete
    }
}

const ImportStaticDataContainer = connect(mapStateToProps)(ImportStaticData)

export default ImportStaticDataContainer;