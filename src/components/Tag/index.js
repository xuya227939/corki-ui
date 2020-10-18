import React, { Component } from 'react';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import './index.css';

const COLORS = ['green', 'red', 'blue', 'lime'];

class Tag extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        const { className, color, visible = true } = this.props;
        const tagClassName = classNames(
            'corki-tag',
            {
                [`corki-tag-${color}`]: color && COLORS.join().includes(color),
                ['corki-tag-has-color']: color && !(COLORS.join().includes(color)),
                ['corki-tag-hidden']: !visible
            },
            className,
        );

        const tagStyle = {
            backgroundColor: color && !(COLORS.join().includes(color)) ? color: undefined
        };
        return (
            <span className={tagClassName} style={tagStyle}>
                {this.props.children}
            </span>
        );
    }
}

Tag.propTypes = {
    color: PropTypes.string,
    className: PropTypes.string,
    visible: PropTypes.bool
};

module.exports = Tag;