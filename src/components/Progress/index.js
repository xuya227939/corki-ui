import React,{ Component } from 'react';
import * as PropTypes from 'prop-types';
import './index.css';

class Progress extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { strokeColor = 'red' } = this.props;
        let { percent = 0 } = this.props;
        if(percent > 100) {
            percent = 100;
        }
        if(percent <= 0) {
            percent = 0;
        }
        percent = percent.toString() + '%';
        return (
            <div className="corki-progress">
                <div className="corki-progress-outer">
                    <div className="corki-progress-inner">
                        <div
                            style={{
                                backgroundColor: strokeColor,
                                width: percent,
                                height: '100%',
                                borderRadius: '100px'
                            }}
                        />
                    </div>
                    <span className="corki-progress-text" title={percent}>
                        {percent}
                    </span>
                </div>
            </div>
        );
    }
}

Progress.propTypes = {
    strokeColor: PropTypes.string,
    percent: PropTypes.number,
};

module.exports = Progress;