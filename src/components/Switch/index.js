import React, { Component } from 'react';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import './index.css';
class Switch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onSwitch: (typeof this.props.defaultChecked == 'boolean') ? this.props.defaultChecked : (this.props.checked || true)
        };
    }

    // switch 开关
    switchHandle = (e) => {
        const { onChange, checked = 3, disabled } = this.props;
        if(disabled) return;
        const { onSwitch } = this.state;
        if(checked != 3) {
            this.setState({
                onSwitch: checked
            });
            onChange(checked, e);
            return;
        }

        this.setState({
            onSwitch: !this.state.onSwitch
        });

        if(onChange) onChange(onSwitch, e);
    }
 
    render() {
        const { onSwitch } = this.state;
        const { className, checked = 3, defaultChecked = false, disabled = false } = this.props;
        const switchClass = classNames(className, {
            'corki-switch': true,
            'corki-switch-checked': checked == 3 ? onSwitch : checked,
            'corki-switch-disabled': disabled
        });
        return (
            <button
                type="button"
                role="switch"
                aria-checked={onSwitch}
                className={switchClass}
                onClick={this.switchHandle}
            >
                <span className="corki-switch-inner"></span>
            </button>
        );
    }
}

Switch.propTypes = {
    className: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    defaultChecked: PropTypes.bool,
    disabled: PropTypes.bool
};

module.exports = Switch;