import React,{ Component } from 'react';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import './index.css';
class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { placeholder, className, defaultValue, disabled = false, type = 'text', value, onChange } = this.props;
        const inputClass = classNames(className, {
            'corki-input': true,
            'corki-input-disabled': disabled
        });
        return (
            <input
                placeholder={placeholder}
                className={inputClass}
                defaultValue={defaultValue}
                disabled={disabled}
                type={type}
                value={value}
                onChange={onChange}
            />
        );
    }
}

Input.propTypes = {
    placeholder: PropTypes.string,
    className: PropTypes.string,
    defaultValue: PropTypes.string,
    disabled: PropTypes.bool,
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
};

module.exports = Input;