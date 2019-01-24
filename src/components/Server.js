import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Sparklines} from "react-sparklines/src/Sparklines";
import SparklinesLine from "react-sparklines/src/SparklinesLine";

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

        if (!this.props.pings || this.props.pings.length == 0) {
            this.requestPings();
        }
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

        return (
            <div>
                {server !== undefined ?
                    <div>
                        <Link to='/'>Back to list</Link>

                        <p><strong>Server ID: </strong> {server.id}</p>
                        <p><strong>Server Name: </strong><span dangerouslySetInnerHTML={{__html: server.name}}></span></p>
                        <p><strong>Server URL: </strong> <a href={'http://' + server.url}>{server.url}</a></p>
                        <p><strong>Server Ping: </strong> {parseFloat(server.ping).toFixed(2)}±{parseFloat(server.jitter).toFixed(2)}</p>

                        <h3>Pings</h3>

                        <Sparklines data={[5, 10, 5, 20, 8, 15]} limit={5} width={100} height={20} margin={5}>
                            <SparklinesLine />
                        </Sparklines>
                        <p>Status: {pings ? pings.status : '...'}</p>
                        {pings ?
                            pings.data.map((ping) =>
                                (<span>{ping}ms, </span>)
                            )
                            :
                            <p>Empty</p>
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
