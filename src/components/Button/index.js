import React,{ Component } from 'react';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import './index.css';
class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { onClick, disabled = false, children, htmlType = 'button', type, className } = this.props;
        const btnClass = classNames(className, {
            'corki-btn': true,
            'corki-btn-default': !type,
            'corki-btn-primary': type == 'primary' && !disabled,
            'corki-btn-disabled': disabled,
            'corki-btn-danger': type == 'danger' && !disabled,
        });
        return (
            <button
                className={btnClass}
                onClick={onClick}
                disabled={disabled}
                type={htmlType}
            >
                {children}
            </button>
        );
    }
}

Button.propTypes = {
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    htmlType: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string
};

module.exports = Button;