import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import './index.css';
class VerificationCode extends React.Component {
    constructor(props) {
        super(props);
        this.numbers = [];
        this.state = {
            id: "myCanvas"
        }
        this.updateCode = this.updateCode.bind(this);
    }
    componentDidMount() {
        this.generateCode();
    };

    generateCode() {
        const { id } = this.state;
        let { height, width } = this.props;
        let canVas = document.getElementById(id);
        if (!canVas.getContext) {
            return;
        }
        let w = width || 192;
        let b = w / 4;
        let h = height || 40;
        let context = canVas.getContext("2d");
        context.fillStyle = this.rc(180, 230);
        context.fillRect(0, 0, w, h);
        let pool = "ABCDEFGHIJKLIMNOPQRSTUVWSYZ1234567890";
        for (let i = 0; i < 4; i++) {
            let c = pool[this.rn(0, pool.length)];
            this.numbers.push(c);
            let fs = this.rn(18, 40);
            let deg = this.rn(-30, 30);
            context.font = fs + 'px Simhei';
            context.textBaseline = "top";
            context.fillStyle = this.rc(80, 150);
            context.save();
            context.translate(b * i + 15, h / 2);
            context.rotate(deg * Math.PI / 180);
            context.fillText(c, -10, -15);
            context.restore();
        }
        for (let i = 0; i < 5; i++) {
            context.beginPath();
            context.moveTo(this.rn(0, w), this.rn(0, h));
            context.lineTo(this.rn(0, w), this.rn(0, h));
            context.strokeStyle = this.rc(180, 230);
            context.closePath();
            context.stroke();
        }
        for (let i = 0; i < 40; i++) {
            context.beginPath();
            context.arc(this.rn(0, w), this.rn(0, h), 1, 0, 2 * Math.PI);
            context.closePath();
            context.fillStyle = this.rc(150, 200);
            context.fill();
        }
        if (this.props.getNumbers) {
            this.props.getNumbers(this.numbers);
        }
    };

    rc(min, max) {
        let r = this.rn(min, max);
        let g = this.rn(min, max);
        let b = this.rn(min, max);
        return `rgb(${r},${g},${b})`;
    }

    rn(min, max) {
        return parseInt(Math.random() * (max - min) + min);
    }

    updateCode() {
        this.numbers = [];
        this.generateCode();
    }

    render() {
        const { id } = this.state;
        const { height, width } = this.props;
        return (
            <div className="corki-code-wapper" style={{ width: width || '192px' }} onClick={this.updateCode}>
                <canvas id={id} width={width || '192'} height={height || '40'} />
            </div>
        );
    }
}

VerificationCode.propTypes = {
    getNumbers: PropTypes.func,
    width: PropTypes.string,
    height: PropTypes.string
};

module.exports = VerificationCode;