import React, {Component} from 'react';

class LastSeen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            delta: 'N/A',
        };
    }
    componentDidMount() {
        this.timer = setInterval(this.update.bind(this), 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    update() {
        this.setState({
            delta: this.delta(),
        });
    }

    delta() {
        let now = new Date().getTime();
        let check = this.props.time;

        let delta = (now - check) / 1000;

        return Math.round(delta);
    }

    render() {
        return (
            <span>
                {this.state.delta}
                <small> secs</small>
            </span>
        );
    }
}

export default LastSeen;