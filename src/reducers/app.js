import * as types from '../constants/ActionTypes';

const app = (state = [], action) => {
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
            let serverProblems = state.serverProblems || [];
            let serversWithProblems = undefined;

            // Push current servers with problems
            if (state.data) {
                serversWithProblems = state.data.reduce((acc, sv) => {
                    return acc + (sv.abnormal ? 1 : 0);
                }, 0);

                serverProblems.unshift(serversWithProblems);
            }

            // Regulate problem history
            if (serverProblems.length > 100) {
                serverProblems.pop()
            }

            return {
                ...state,
                ...{
                    time: (new Date()).getTime(),
                    data: action.data,
                    serversWithProblems: serversWithProblems,
                    serverProblems: serverProblems,
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