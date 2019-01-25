import * as types from '../constants/ActionTypes';

const app = (state = [], action) => {
    let mes;

    switch (action.type) {
        case types.PINGS_GET_REQUEST:
            console.log('ping request');

            return {
                ...state,
                ...{
                    [action.id]: {
                        data: state[action.id] ? state[action.id].data : undefined,
                        status: 'Loading',
                        loading: true,
                    }
                }
            };

        case types.PINGS_GET_REQUEST_SUCCESS:
            console.log('ping success');

            return {
                ...state,
                ...{
                    [action.id]: {
                        data: action.data.pings,
                        status: 'Loaded',
                        loading: false,
                    }
                }
            };
        case types.PINGS_GET_REQUEST_FAILED:
            console.log('ping failed');
            if (action.error) {
                mes = action.error.message;
            } else {
                mes = 'No error object';
            }


            return {
                ...state,
                ...{
                    [action.id]: {
                        data: [],
                        status: mes,
                        loading: false,
                    }
                }
            };
        default:
            return state
    }
};

export default app