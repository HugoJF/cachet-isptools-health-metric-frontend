import React, {Component} from 'react';

class NumberDirection extends Component {

    render() {
        // Renaming
        let old = this.history;
        let value = this.props.value;
        let time = this.props.time;

        if (!this.time) {
            this.time = time;
        }

        if (this.time !== time) {
            // Update local variable
            this.history = this.props.value;
            let dif = old - value;

            // Update direction
            if (dif < 0) {
                this.direction = -1;
            } else if (dif > 0) {
                this.direction = 1;
            }
        }


        // Check if prop was passed
        let downGood = this.props.downGood || true;

        // Store correct class names
        let up = downGood ? 'danger' : 'success';
        let down = downGood ? 'success' : 'danger';

        switch (this.direction) {
            case -1:
                return <span className={down}>🡻</span>
            case 1:
                return <span className={up}>🡹</span>
            default:
                return <span>🡺</span>
        }
    }
}

export default NumberDirection;