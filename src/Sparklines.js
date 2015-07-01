import React from 'react';
import SparklinesLine from './SparklinesLine';
import SparklinesBars from './SparklinesBars';
import SparklinesSpots from './SparklinesSpots';
import SparklinesReferenceLine from './SparklinesReferenceLine';

class Sparklines extends React.Component {

    constructor (props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.data.some((d, index) => d !== this.props.data[index]);
    }

    render() {

        let { data, limit } = this.props;

        if (!data || data.length === 0) {
            return;
        }

        if (limit && limit < data.length) {
            data = data.slice(data.length - limit);
        }

        let points = data.map((d, i) => {
            return {
                x: i * 20,
                y: 100 - data[i]
            }
        });

        let sparklinesBars = !this.props.bars ? {} :
            <SparklinesBars
                points={points}
                color={this.props.color}
                strokeWidth={this.props.lineWidth}
                fill={this.props.fill} />

        let sparklinesLine = points.length < 2 ? {} :
            <SparklinesLine
                points={points}
                color={this.props.color}
                strokeWidth={this.props.lineWidth}
                fill={this.props.fill} />

        let sparklinesGroup = this.props.bars ? {} :
            <g>
                {sparklinesLine}
                <SparklinesSpots
                    points={points}
                    size={this.props.lineWidth * 3}
                    color={this.props.endSpotColor} />
            </g>

        return (
            <svg preserveAspectRatio="xMinYMin meet">
                {sparklinesBars}
                {sparklinesGroup}
                <SparklinesReferenceLine points={points} />
            </svg>
        );
    }
}
Sparklines.propTypes = {
    data: React.PropTypes.array,
    limit: React.PropTypes.number,
    bars: React.PropTypes.bool,
    color: React.PropTypes.string,
    lineWidth: React.PropTypes.number,
    fill: React.PropTypes.string
};
Sparklines.defaultProps = {
    limit: 100,
    color: 'black',
    lineWidth: 1,
    fill: 'transparent'
};

export default Sparklines;
