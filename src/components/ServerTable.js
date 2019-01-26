import React, {Component} from 'react';
import ServerTableRow from "./ServerTableRow";

class ServerTable extends Component {


    render() {
        let tableData;
        console.log(this.props.servers);
        if (this.props.servers) {
            tableData = this.props.servers.map((server) => (
                <ServerTableRow server={server} colSpan={7}/>
            ))
        } else {
            tableData = <tr>
                <td colSpan={7}>{this.props.loading ? 'Loading data...' : 'Empty table'}</td>
            </tr>;
        }
        return (
            <table style={{textAlign: 'center', width: '100%'}} border="1px solid black" cellPadding={1}>
                <thead>
                <tr>
                    <th>Status</th>
                    <th>Name</th>
                    <th>URL</th>
                    <th>Ping (jitter)</th>
                    <th>Loss</th>
                    <th>State</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {tableData}
                </tbody>
            </table>
        );
    }
}

export default ServerTable;
