import React, {Component} from 'react';
import '../styles/App.css';
import ServerTable from "./ServerTable";
import NumberDirection from "./NumberDirection";
import PingGraph from "./PingGraph";

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
            <div style={{width: '1500px', textAlign: 'center', margin: '0 auto'}} className="App">
                <h1>Server Health Monitoring Dashboard</h1>
                <p>Status: {this.props.status}</p>
                <button onClick={this.loadData.bind(this)}>Refresh</button>

                <h3>Servers with problems: {this.props.serversWithProblems}
                    <NumberDirection value={this.props.serversWithProblems}/>
                </h3>

                <p>
                    <PingGraph
                        min={0}
                        max={this.serverCount()}
                        height={150}
                        width={1500}
                        data={this.props.serverProblems}
                    />
                </p>
                <ServerTable loading={this.props.loading} servers={this.props.data} />
            </div>
        );
    }
}

export default App;
