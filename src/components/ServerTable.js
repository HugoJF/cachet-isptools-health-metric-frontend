import React, {Component} from 'react';
import ServerTableRow from "./ServerTableRow";

class ServerTable extends Component {


    buildTable() {
        if (this.props.servers) {
            return (
                this.props.servers.filter((server) => (
                    server.online
                )).map((server) => (
                    <ServerTableRow key={server.url} server={server} colSpan={7}/>
                ))
            )
        } else {
            return (
                <tr>
                    <td colSpan={7}>{this.props.loading ? 'Loading data...' : 'Empty table'}</td>
                </tr>
            );
        }
    }


    render() {
        return (
            <table className={'table'} border="1px">
                <thead>
                <tr>
                    <th>Status</th>
                    <th>Name</th>
                    <th>Ping (jitter)</th>
                    <th>Loss</th>
                    <th>State</th>
                    <th>Last Seen</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {this.buildTable()}
                </tbody>
            </table>
        );
    }
}

export default ServerTable;
