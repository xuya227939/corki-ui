import React, { Component } from 'react';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import './index.css';

class Badge extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        const { children, count = 5, className, type = 'primary', overflowCount = '' } = this.props;

        const badgeClass = classNames(className, {
            'corki-badge-count': true,
            'corki-badge-primary': type == 'primary',
            'corki-badge-info': type == 'info',
            'corki-badge-warning': type == 'warning',
            'corki-badge-danger': type == 'danger',
        });
        return (
            <span className="corki-badge">
                {children}
                <span className={badgeClass}>
                    {overflowCount ? overflowCount + '+' : count}
                </span>
            </span>
        );
    }
}

Badge.propTypes = {
    count: PropTypes.number,
    overflowCount: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string
};

module.exports = Badge;