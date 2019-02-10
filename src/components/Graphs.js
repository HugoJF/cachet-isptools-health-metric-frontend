import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Graphs extends Component {
    render() {
        const servers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        const date = new Date().getTime();

        const grid = {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gridTemplateRows: '1fr 1fr 1fr',
            gridTemplateAreas: '". . ." ". . ." ". . ."',
            width: '1647px',
            textAlign: 'center',
            margin: 'auto',
        };

        return (
            <div style={{textAlign: 'center'}}>
                <p><Link to={'/'}>Go back</Link></p>
                <h3>General graphs</h3>
                <img src={'http://rrdtool-player-count.denerdtv.com/player_count.png?' + date}/>
                <br/>
                <h3>Per server</h3>
                <div style={grid}>
                    {servers.map((id) => (
                        <img src={'http://rrdtool-performance-graph.denerdtv.com/sv' + id + '.png?' + date}/>
                    ))}
                </div>
            </div>
        );
    }
}

export default Graphs;