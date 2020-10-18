import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classNames';
import './index.css';
class Checkbox extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    checkboxHandle = (e) => {
        const { onChange, disabled } = this.props;
        if(disabled) return;
        if(onChange) onChange(e);
    }

    render() {
        const { disabled, checked, defaultChecked, children } = this.props;
        const className = classNames({
            'corki-checkbox-disabled': disabled,
            'corki-checkbox': true,
            'corki-checkbox-checked': (typeof checked == 'boolean') ? checked : (defaultChecked ? defaultChecked : false)
        });
        return (
            <label onClick={this.checkboxHandle} className="corki-checkbox-wrapper">
                <span className={className}>
                    <input disabled={disabled} type="checkbox" className="corki-checkbox-input" value="" />
                    <span className="corki-checkbox-inner" />
                    <span>
                        {children}
                    </span>
                </span>
            </label>
        );
    }
}

Checkbox.propTypes = {
    defaultChecked: PropTypes.bool,
    disabled: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func
};

module.exports = Checkbox;