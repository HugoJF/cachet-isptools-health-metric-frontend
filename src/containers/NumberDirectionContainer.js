import {connect} from 'react-redux'
import NumberDirectionComponent from "../components/NumberDirection";

export const NumberDirection = connect(
    state => ({
        time: state.app.time,
    }),
    undefined
)(NumberDirectionComponent);
