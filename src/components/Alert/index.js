import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classNames';
import './index.css';

class Alert extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { className, message = 'test', description, type = 'success', style } = this.props;

        const alertClass = classNames(className, {
            'corki-alert': true,
            'corki-alert-no-icon': true,
            'corki-alert-success': type === 'success',
            'corki-alert-info': type === 'info',
            'corki-alert-warning': type === 'warning',
            'corki-alert-error': type === 'error'
        });

        const messageClass = classNames({
            'corki-alert-message': true,
            'corki-alert-with-description': description
        });

        const descriptionClass = classNames({
            'corki-alert-description': true,
            'corki-alert-with-description': description
        });

        return (
            <div
                className={alertClass}
                style={{ ...style }}
                role="alert"
            >
                <span className={messageClass}>{message}</span>
                <span className={descriptionClass}>{description}</span>
            </div>
        );
    }
}

Alert.propTypes = {
    type: PropTypes.string
};

module.exports = Alert;