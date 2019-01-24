import {connect} from 'react-redux'
import AppComponent from '../components/App'
import {requestServers} from '../actions/Actions'

const mapDispatchToProps = dispatch => ({
    requestServers: () => {
        dispatch(requestServers());
    },
});

export const App = connect(
    state => ({
        data: state.app.data,
        loading: state.app.loading,
        status: state.app.status,
    }),
    mapDispatchToProps
)(AppComponent);
