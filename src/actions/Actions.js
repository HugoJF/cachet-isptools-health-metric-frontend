import * as types from '../constants/ActionTypes'

export const requestServers = () => (
    (dispatch) => {
        dispatch({
            type: types.SERVERS_GET_REQUEST
        });

        fetch('http://104.156.246.245:5000/servers')
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText)
                }

                return response;
            }).then((response) => response.json())
            .then((data) => dispatch(requestServersSuccess(data)))
            .catch((e) => dispatch(requestServersFailed(e)))
    });

export const requestServersSuccess = (data) => (
    (dispatch) => {
        dispatch({
            data: data,
            type: types.SERVERS_GET_REQUEST_SUCCESS,
        });
    });

export const requestServersFailed = (e) => (
    (dispatch) => {
        dispatch({
            error: e,
            type: types.SERVERS_GET_REQUEST_FAILED,
        });
    });

export const requestPings = (id) => (
    (dispatch) => {
        dispatch({
            type: types.PINGS_GET_REQUEST,
            id: id,
        });

        fetch('http://104.156.246.245:5000/pings/' + id)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText)
                }

                return response;
            }).then((response) => response.json())
            .then((data) => {
                if (data.error !== false) {
                    throw Error('API could not find ping data')
                }

                return data;
            })
            .then((data) => dispatch(requestPingsSuccess(id, data)))
            .catch((e) => dispatch(requestPingsFailed(id, e)))
    });

export const requestPingsSuccess = (id, data) => (
    (dispatch) => {
        dispatch({
            id: id,
            data: data,
            type: types.PINGS_GET_REQUEST_SUCCESS,
        });
    });

export const requestPingsFailed = (id, e) => (
    (dispatch) => {
        dispatch({
            id: id,
            error: e,
            type: types.PINGS_GET_REQUEST_FAILED,
        });
    });
