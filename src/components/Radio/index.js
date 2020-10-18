import React, { Component } from 'react';
import classNames from 'classNames';
import * as PropTypes from 'prop-types';
import './index.css';

class Radio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onRadio: (typeof this.props.defaultChecked == 'boolean') ? this.props.defaultChecked : (this.props.checked || true)
        };
    }

    // radio 开关
    radioHandle = (e) => {
        const { onChange, checked = 3, disabled } = this.props;
        if(disabled) return;
        const { onRadio } = this.state;
        if(checked != 3) {
            this.setState({
                onRadio: checked
            });
            onChange(checked, e);
            return;
        }
        if(!onRadio) {
            this.setState({
                onRadio: true
            });
        }

        if(onChange) onChange(onRadio, e);
    }

    render() {
        const { onRadio } = this.state;
        const { checked = 3, children, className, defaultChecked = false, disabled = false } = this.props;
        const radioClass = classNames({
            'corki-radio': true,
            'corki-radio-checked': checked == 3 ? onRadio : checked,
            'corki-radio-disabled': disabled
        });

        const labelClass = classNames(className, {
            'corki-radio-wrapper': true,
            'corki-radio-wrapper-disabled': disabled
        });

        return (
            <label className={labelClass}>
                <span className={radioClass}>
                    <input className="corki-radio-input" type="radio" onClick={this.radioHandle} />
                    <span className="corki-radio-inner"></span>
                </span>
                <span className="corki-radio-text">
                    {children}
                </span>
            </label>
        );
    }
}

Radio.propTypes = {
    className: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    defaultChecked: PropTypes.bool,
    disabled: PropTypes.bool
};

module.exports = Radio;