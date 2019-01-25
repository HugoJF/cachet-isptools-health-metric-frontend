import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PingGraph from "./PingGraph";

class Server extends Component {

    loadData() {
        this.props.requestServers();
    }

    requestPings() {
        this.props.requestPings(this.getId());
    }

    getId() {
        return parseInt(this.props.match.params.id);
    }

    componentWillMount() {
        if (!this.props.servers) {
            this.loadData();
        }

        if (!this.props.pings || !this.props.pings[this.getId()] || this.props.pings[this.getId()].length === 0) {
            this.requestPings();
        }
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.requestPings()
        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        console.log('render');
        let server = undefined;
        let pings = [];

        if (this.props.servers) {
            let id = this.getId();

            server = this.props.servers.filter((sv) => (id === parseInt(sv.id)));

            if (server.length === 1) {
                server = server[0];
            } else {
                console.log('Could not find server data');
                server = undefined;
            }

            if (this.props.pings) {
                pings = this.props.pings[id];
            }
        }

        console.log(pings);
        return (
            <div style={{textAlign: 'center'}}>
                {server !== undefined ?
                    <div>
                        <Link to='/'>Back to list</Link>

                        <p><strong>Server ID: </strong> {server.id}</p>
                        <p><strong>Server Name: </strong><span dangerouslySetInnerHTML={{__html: server.name}}></span></p>
                        <p><strong>Server URL: </strong> <a href={'http://' + server.url}>{server.url}</a></p>
                        <p><strong>Server Ping: </strong> {parseFloat(server.ping).toFixed(2)} ± {parseFloat(server.jitter).toFixed(2)}</p>

                        <h2>Pings</h2>

                        <p><strong>Status:</strong> {pings ? pings.status : '...'}</p>
                        <p><strong>Count:</strong> {pings ? (pings.data ? pings.data.length : '0') : '0'}</p>
                        {
                            (pings) ?
                                <PingGraph
                                    min={0}
                                    max={100}
                                    width={250}
                                    height={50}
                                    data={pings.data}
                                />
                                :
                                <p>missing data</p>
                        }
                    </div>
                    :
                    <p>Could not find server information</p>
                }
            </div>
        );
    }
}

export default Server;
