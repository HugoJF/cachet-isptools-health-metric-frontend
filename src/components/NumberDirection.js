import React, {Component} from 'react';

class NumberDirection extends Component {

    render() {
        let old = this.history;
        let value = this.props.value;

        this.history = this.props.value;

        let downGood = this.props.downGood || true;

        let up = downGood ? 'danger' : 'success';
        let down = downGood ? 'success' : 'danger';

        if(old && old !== value) {
            if(value < old) {
                return <span className={down + "-color"}>🡻</span>
            } else {
                return <span className={up + "-color"}>🡹</span>
            }
        } else {
            return <span>🡺</span>
        }
    }
}

export default NumberDirection;