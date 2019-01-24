import React, {Component} from 'react';
import '../styles/App.css';
import ServerTable from "./ServerTable";

class App extends Component {
    componentWillMount() {
        this.loadData();
    }
    loadData() {
        console.log(this.props);
        this.props.requestServers();
    }

    render() {
        return (
            <div className="App">
                <p>Status: {this.props.status}</p>
                <p>Loading: {this.props.loading}</p>
                <button onClick={this.loadData.bind(this)}>Load data</button>
                <ServerTable servers={this.props.data}></ServerTable>
            </div>
        );
    }
}

export default App;
