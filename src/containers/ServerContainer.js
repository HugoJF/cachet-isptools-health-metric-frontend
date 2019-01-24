import {connect} from 'react-redux'
import ServerComponent from '../components/Server'
import {requestServers, requestPings} from '../actions/Actions'

const mapDispatchToProps = dispatch => ({
    requestServers: () => {
        dispatch(requestServers());
    },
    requestPings: (id) => {
        dispatch(requestPings(id));
    }
});

export const Server = connect(
    state => ({
        servers: state.app.data,
        pings: state.pings,
    }),
    mapDispatchToProps
)(ServerComponent);
