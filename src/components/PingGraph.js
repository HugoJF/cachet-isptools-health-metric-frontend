import React, {Component} from 'react';
import {Sparklines, SparklinesLine} from "react-sparklines";

class PingGraph extends Component {

    render() {
        // Compute parameters
        let max = this.props.max || 150;
        let min = this.props.min || 0;
        let width = this.props.width || 250;
        let widthUnit = this.props.widthUnit || 'px';
        let height = this.props.height || 50;
        let heightUnit = this.props.heightUnit || 'px';
        let style = {
            height: height + heightUnit,
            width: width + widthUnit,
        };

        // Reverse data if passed
        let data = [];
        if (this.props.data) {
            data = this.props.data.slice().reverse();
        }

        return (
            <div>
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
            </div>
        );
    }
}

export default PingGraph;