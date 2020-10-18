import React, { Component } from 'react';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import './index.css';
class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            isShowDropDown: false
        };
    }

    componentDidMount() {
        document.addEventListener('click', (e) => {
            if(document.querySelector('.corki-select') && document.querySelector('.corki-select').className.includes('corki-select-open')) {
                this.setState({
                    isShowDropDown: false
                });
            }
        });
    }

    handleClick = (e) => {
        if(this.props.disabled) return;
        e.nativeEvent.stopImmediatePropagation();
        e.stopPropagation();
        if(e.target.getAttribute('data-disabled') == 'true') return;
        this.setState({
            isShowDropDown: !this.state.isShowDropDown
        });

        let offsetHeight = '';
        let offsetWidth = '';
        if(e.target.getAttribute('class').includes('corki-select-selection')) {
            offsetHeight = e.target.parentElement.offsetHeight;
            offsetWidth = e.target.parentElement.offsetWidth;
        }

        if(e.target.nodeName == 'svg') {
            offsetHeight = e.target.parentElement.parentElement.parentElement.offsetHeight;
            offsetWidth = e.target.parentElement.parentElement.parentElement.offsetWidth;
        }

        if(!offsetHeight && !offsetWidth) {
            offsetHeight = e.target.offsetHeight;
            offsetWidth = e.target.offsetWidth;
        }
        if(document.querySelector('.corki-select-dropdown')) document.querySelector('.corki-select-dropdown').setAttribute('style', `top: ${offsetHeight + 2}px; width: ${offsetWidth}px`);
        if(document.querySelector('.corki-select-dropdown-menu')) {
            document.querySelector('.corki-select-dropdown-menu').addEventListener('click', (e) => {
                if(e.target.getAttribute('data-disabled') == 'true') return;
                this.props.onChange(e);
            });
        }
    }

    render() {
        const { defaultValue, handleChange, value, children, disabled } = this.props;
        const { isShowDropDown } = this.state;
        const className = classNames({
            'corki-select': true,
            'corki-select-open': isShowDropDown,
            'corki-select-disabled': disabled
        });
        return (
            <div
                disabled={disabled}
                className={className}
                style={this.props.style}
                onClick={(e) => this.handleClick(e)}
            >
                <div className="corki-select-selection">
                    {
                        value ? value : defaultValue
                    }
                </div>
                <span className="corki-select-arrow">
                    <i className={isShowDropDown ? "corki-select-arrow-icon" : "corki-select-arrow-down-icon"} aria-label="图标: down">
                        <svg
                            viewBox="64 64 896 896"
                            focusable="false"
                            class=""
                            data-icon="down"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                        </svg>
                    </i>
                </span>
                {
                    <div className={isShowDropDown ? 'corki-select-dropdown corki-select-show' : 'corki-select-dropdown corki-select-remove'}>
                        <ul className="corki-select-dropdown-menu" role="listbox">
                            {
                                children && children.map((item, key) => {
                                    const { props } = item;
                                    let disabled = false, hasSelected = false;
                                    if(props.disabled) disabled = true;

                                    if((value || defaultValue) == props.value) hasSelected = true;

                                    const liClass = classNames({
                                        'corki-select-dropdown-menu-item': true,
                                        'corki-select-dropdown-menu-item-selected': hasSelected,
                                        'corki-select-dropdown-menu-item-disabled': disabled
                                    });
                                    return (
                                        <li
                                            key={key}
                                            className={liClass}
                                            role="option"
                                            unselectable="on"
                                            aria-selected="false"
                                            data-disabled={disabled ? "true" : "false"}
                                        >
                                            {props.value}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                }
            </div>
        );
    }
}

Select.propTypes = {
    defaultValue: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func
};

module.exports = Select;