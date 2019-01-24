import React, {Component} from 'react';
import {Link} from "react-router-dom";

class ServerTable extends Component {


    render() {
        let tableData;
        console.log(this.props.servers);
        if (this.props.servers) {
            tableData = this.props.servers.map((server) => (
                <tr>
                    <td>{server.id}</td>
                    <td dangerouslySetInnerHTML={{__html: server.name}}></td>
                    <td>{server.url}</td>
                    <td>{parseFloat(server.ping).toFixed(2)} ± {parseFloat(server.jitter).toFixed(2)}</td>
                    <td>{server.abnormal ? 'ABNORMAL' : 'Normal'}</td>
                    <td><Link to={'server/' + server.id}>Details</Link></td>
                </tr>
            ))
        } else {
            tableData = <tr>
                <td colSpan={4}>Empty table</td>
            </tr>;
        }
        return (
            <table border="1px solid black" cellPadding={2}>
                <thead>
                <tr>
                    <th>Server ID</th>
                    <th>Server Name</th>
                    <th>Server URL</th>
                    <th>Ping (jitter)</th>
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
