import React, {Component} from 'react';
import '../styles/App.css';
import ServerTable from "./ServerTable";
import PingGraph from "./PingGraph";
import {NumberDirection} from "../containers/NumberDirectionContainer";
import {Link} from "react-router-dom";

class App extends Component {
    componentWillMount() {
        this.loadData();
    }

    loadData() {
        console.log(this.props);
        this.props.requestServers();
    }

    serversWithProblems() {
        let res = 'Waiting for data';

        if (this.props.data) {
            res = this.props.data.reduce((acc, sv) => {
                return acc + (sv.abnormal ? 1 : 0);
            }, 0);
        }

        return res;
    }

    serverCount() {
        if (this.props.data) {
            return this.props.data.length;
        } else {
            return 0;
        }
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.loadData();
        }, 5000);
    }

    componentDidUnmount() {
        clearInterval(this.timer);
    }

    render() {
        return (
            <div className="app">
                {/* Header  */}
                <h1>Server Health Monitoring Dashboard</h1>
                <p>Status: {this.props.status}</p>
                <p><Link to={'/graphs'}>Graphs</Link></p>
                <button onClick={this.loadData.bind(this)}>Refresh</button>

                {/* Abnormal server counter */}
                <h3>Servers with problems: {this.props.serversWithProblems}
                    <NumberDirection value={this.props.serversWithProblems}/>
                </h3>

                {/* Ping problems counter */}
                <h4>Servers with ping problems: {this.props.serversWithPingProblems}
                    <NumberDirection value={this.props.serversWithPingProblems}/>
                </h4>

                {/* Jitter problems counter */}
                <h4>Servers with jitter problems: {this.props.serversWithJitterProblems}
                    <NumberDirection value={this.props.serversWithJitterProblems}/>
                </h4>

                {/* Loss problems counter */}
                <h4>Servers with loss problems: {this.props.serversWithLossProblems}
                    <NumberDirection value={this.props.serversWithLossProblems}/>
                </h4>

                {/* Abnormal servers history */}
                <p>
                    <PingGraph
                        min={0}
                        max={this.serverCount()}
                        height={150}
                        width={1500}
                        data={this.props.serverProblems}
                    />
                </p>

                {/* Server information table */}
                <ServerTable loading={this.props.loading} servers={this.props.data}/>
            </div>
        );
    }
}

export default App;
