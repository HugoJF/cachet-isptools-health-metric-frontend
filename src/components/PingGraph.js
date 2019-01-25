import React, {Component} from 'react';
import {Sparklines, SparklinesLine} from "react-sparklines";

class PingGraph extends Component {

    render() {
        let max = this.props.max || 150;
        let min = this.props.min || 0;
        let width = this.props.width || 250;
        let height = this.props.height || 50;
        let style = {
            height: height + 'px',
            width: width + 'px',
        };


        let data = [];
        if (this.props.data) {
            data = this.props.data.slice().reverse();
        }

        return (<div>
            <Sparklines
                min={min}
                max={max}
                style={style}
                width={width}
                height={height}
                data={data}
            >
                <SparklinesLine/>
            </Sparklines>
        </div>)


            ;
    }
}

export default PingGraph;