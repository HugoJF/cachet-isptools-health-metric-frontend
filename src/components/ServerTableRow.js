import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PingWithJitter from "./PingWithJitter";
import {NumberDirection} from "../containers/NumberDirectionContainer";

class ServerTableRow extends Component {

    abnormalReason() {
        let server = this.props.server;

        if (server) {
            if (server.abnormal_jitter) {
                return 'JITTER';
            } else if (server.abnormal_ping) {
                return 'PING';
            } else if (server.abnormal_loss) {
                return 'LOSS';
            }
        } else {
            return 'Missing server information';
        }
    }

    flashAbnormal() {
        let server = this.props.server;

        if (!server) {
            this.flash = {};
        }

        if (this.abnormal === undefined) {
            this.abnormal = server.abnormal;
        }

        if (this.abnormal !== server.abnormal) {
            this.abnormal = server.abnormal;
            this.flash = {backgroundColor: server.abnormal ? '#691313' : '#216d17'};

            setTimeout(() => {
                this.flash = {};
                this.setState({...this.state, ...{lastState: server.abnormal}});
            }, 1000)
        }
    }

    status() {
        let server = this.props.server;

        return server.status ? 'bg-success' : 'bg-danger';
    }

    statusText() {
        let server = this.props.server;

        return server.status ? 'Online' : 'Offline';
    }

    render() {

        this.flashAbnormal();

        let server = this.props.server;

        if (server) {
            return (
                <tr style={this.flash || {}}>
                    <td className={this.status()}>{this.statusText()}</td>
                    <td dangerouslySetInnerHTML={{__html: server.name}}></td>
                    <td>
                        <code>{server.url}</code>
                    </td>
                    <td>
                        <NumberDirection value={server.ping}/>
                        <PingWithJitter server={server} />
                        <NumberDirection value={server.jitter}/>
                    </td>
                    <td>
                        <NumberDirection value={server.loss}/>
                        <strong className={server.abnormal_loss ? 'danger' : ''}>{parseFloat(server.loss * 100).toFixed(1)}%</strong>
                        <small> ({server.pings} attempts)</small>
                    </td>
                    <td title={this.abnormalReason()}>{server.abnormal ? '⛔' : '✅'}</td>
                    <td>
                        <Link to={'server/' + server.id}>Details</Link>
                    </td>
                </tr>
            );
        } else {
            return (
                <tr>
                    <td colSpan={this.props.colSpan || 1}>Missing server data</td>
                </tr>
            );
        }
    }
}

export default ServerTableRow;