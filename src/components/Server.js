import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PingGraph from "./PingGraph";
import PingWithJitter from "./PingWithJitter";

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

    graphUrl() {
        let name = this.getFilename();

        if (name) {
            return 'http://cachet-health-metric.denerdtv.com/graphs/' + name + '.png?' + new Date().getTime();
        } else {
            return '#';
        }
    }

    getFilename() {
        let server = this.getServer();

        if (server) {
            return server.url.replace(/[^A-Za-z0-9]/g, '_');
        } else {
            return undefined;
        }
    }

    componentWillMount() {
        if (!this.props.servers) {
            this.loadData();
        }
    }


    getServer() {
        let id = this.getId();
        let server = this.props.servers.filter((sv) => (id === parseInt(sv.id)));

        if (server.length === 1) {
            server = server[0];
        } else {
            console.log('Could not find server data');
            server = undefined;
        }

        return server;
    }

    render() {
        let server = undefined;

        if (this.props.servers) {
            server = this.getServer();
        }

        return (
            <div style={{textAlign: 'center'}}>
                {server !== undefined ?
                    <div>
                        {/* Back link */}
                        <Link to='/'>Back to list</Link>

                        {/* Basic information */}
                        <p><strong>Server ID: </strong> {server.id}</p>
                        <p><strong>Server Name: </strong><span dangerouslySetInnerHTML={{__html: server.name}}></span></p>
                        <p><strong>Server URL: </strong> <a href={'http://' + server.url}>{server.url}</a></p>
                        <p>
                            <strong>Server Ping: </strong>
                            <PingWithJitter server={server}/>
                        </p>

                        {/* Ping information and history */}
                        <h2>Graph</h2>
                        <img src={this.graphUrl()}/>
                    </div>
                    :
                    <p>Could not find server information or loading...</p>
                }
            </div>
        );
    }
}

export default Server;
