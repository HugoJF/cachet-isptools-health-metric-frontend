import React, {Component} from 'react';

class PingWithJitter extends Component {
    render() {

        let server = this.props.server;
        return (
            <span>
                <span className={server.abnormal_ping ? 'danger' : ''}>{parseFloat(server.ping).toFixed(2)}</span>
                <small>
                    <span> ± </span>
                    <span className={server.abnormal_jitter ? 'danger' : ''}>{parseFloat(server.jitter).toFixed(2)}</span>
                </small>
            </span>
        );
    }
}

export default PingWithJitter;