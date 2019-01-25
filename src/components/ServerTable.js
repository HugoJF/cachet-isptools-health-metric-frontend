import React, {Component} from 'react';
import {Link} from "react-router-dom";
import NumberDirection from "./NumberDirection";

class ServerTable extends Component {


    render() {
        let tableData;
        console.log(this.props.servers);
        if (this.props.servers) {
            tableData = this.props.servers.map((server) => (
                <tr>
                    <td className={server.status ? 'success' : 'danger'}>{server.status ? 'Online' : 'Offline'}</td>
                    <td dangerouslySetInnerHTML={{__html: server.name}}></td>
                    <td><code>{server.url}</code></td>
                    <td>
                        <NumberDirection value={server.ping}/>
                        <strong>{parseFloat(server.ping).toFixed(2)}ms</strong>
                        <span> ± </span>
                        <small>{parseFloat(server.jitter).toFixed(2)}</small>
                        <NumberDirection value={server.jitter}/>
                    </td>
                    <td>
                        <NumberDirection value={server.loss}/>
                        <strong>{parseFloat(server.loss * 100).toFixed(1)}%</strong>
                        <small> ({server.pings} attempts)</small>
                    </td>
                    <td>{server.abnormal ? '⛔' : '✅'}</td>
                    <td>
                        <Link to={'server/' + server.id}>Details</Link>
                    </td>
                </tr>
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
