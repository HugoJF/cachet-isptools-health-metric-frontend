import * as types from '../constants/ActionTypes';

const app = (state = [], action) => {
    let server;
    switch (action.type) {
        case types.SERVERS_GET_REQUEST:
            return {
                ...state,
                ...{
                    loading: true,
                    status: 'Waiting for API...',
                }
            };
        case types.SERVERS_GET_REQUEST_SUCCESS:
            return {
                ...state,
                ...{
                    data: action.data,
                    loading: false,
                    status: 'Success',
                }
            };
        case types.SERVERS_GET_REQUEST_FAILED:
            let mes;

            if (action.error) {
                mes = action.error.message;
            } else {
                mes = 'No error object';
            }
            return {
                ...state,
                ...{
                    loading: false,
                    status: 'Failure: ' + mes,
                }
            };
        default:
            return state
    }
};

export default app