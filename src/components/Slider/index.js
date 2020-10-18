import React, { Component } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import * as PropTypes from 'prop-types';
import './index.css';
class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            min: this.props.min ? this.props.min : 0,
            max: this.props.max ? this.props.max : 100,
            step: this.props.step ? this.props.step : 1,
            value: this.props.defaultValue ? this.props.defaultValue : 0,
            hasFocus: false,
            hasTooltip: false,
            visible: false
        };

        this.input = React.createRef();
        this.output = React.createRef();
    }

    componentDidMount() {
        if (this.state.value === undefined || this.state.value === null) this.setState({ value: this.state.min });
        if (this.state.value < this.state.min) this.setState({ value: this.state.min });
        if (this.state.value > this.state.max) this.setState({ value: this.state.max });

        this.syncTooltip();
        this.resizeObserver = new ResizeObserver(() => this.syncTooltip());
    }

    setFocus = () => {
        this.input.current.focus();
    }

    handleInput = () => {
        this.props.onChange && this.props.onChange(Number(this.input.current.value));
        this.setState({ value: Number(this.input.current.value), visible: true });
    
        requestAnimationFrame(() => this.syncTooltip());
    }

    handleBlur = () => {
        this.setState({ hasFocus: false, hasTooltip: false, visible: false });
        this.resizeObserver.unobserve(this.input.current);
    }
    
    handleFocus = () => {
        this.setState({ hasFocus: true, hasTooltip: true });
        this.resizeObserver.observe(this.input.current);
    }

    handleTouchStart = () => {
        this.setFocus();
    }

    syncTooltip = () => {
        if(this.state.visible) {
            const percent = Math.max(0, (this.state.value - this.state.min) / (this.state.max - this.state.min));
            const inputWidth = this.input.current.offsetWidth;
            const tooltipWidth = this.output.current.offsetWidth;
            const thumbSize = document.defaultView.getComputedStyle(this.input.current).getPropertyValue('--thumb-size');

            const x = `calc(${inputWidth * percent}px - calc(calc(${percent} * ${thumbSize}) - calc(${thumbSize} / 2)))`;
            this.output.current.style.transform = `translateX(${x})`;

            this.output.current.style.marginLeft = `-${tooltipWidth / 2 - 10}px`;
        }
    }

    render() {
        const { disabled = false } = this.props;
        return (
            <div
                onTouchStart={this.handleTouchStart}
            >
                <input
                    ref={this.input}
                    type="range"
                    className="corki-slider-control"
                    disabled={disabled}
                    min={this.state.min}
                    max={this.state.max}
                    step={this.state.step}
                    value={this.state.value}
                    onInput={this.handleInput}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                />
                {
                    this.state.visible &&
                    <output ref={this.output} className="corki-tooltip-inner">
                        <span className="corki-tooltip-arrow"></span>
                        {this.state.value}
                    </output>
                }
            </div>
        );
    }
}

Slider.propTypes = {
    defaultValue: PropTypes.number,
    disabled: PropTypes.bool,
    max: PropTypes.number,
    min: PropTypes.number,
    step: PropTypes.number,
    onChange: PropTypes.func
};

module.exports = Slider;