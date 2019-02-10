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
        serverProblems: state.app.serverProblems,
        serversWithProblems: state.app.serversWithProblems,
        serversWithPingProblems: state.app.serversWithPingProblems,
        serversWithJitterProblems: state.app.serversWithJitterProblems,
        serversWithLossProblems: state.app.serversWithLossProblems,
    }),
    mapDispatchToProps
)(AppComponent);
