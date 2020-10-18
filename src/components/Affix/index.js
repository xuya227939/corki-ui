import React, { Component } from 'react';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import { getTargetRect, getFixedTop } from './utils';

function getDefaultTarget() {
    return typeof window !== 'undefined' ? window : null;
}

class Affix extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.target = getDefaultTarget;
    }

    componentDidMount() {
        document.addEventListener('scroll', () => this.measure(), false);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', () => this.measure(), false);
    }

    measure = () => {
        if (!this.fixedNode || !this.placeholderNode) return;

        const targetNode = this.target();
        if (!targetNode) return;

        const offsetTop = this.getOffsetTop();

        const targetRect = getTargetRect(targetNode);

        const newState = {};

        const placeholderReact = getTargetRect(this.placeholderNode);

        const fixedTop = getFixedTop(placeholderReact, targetRect, offsetTop);

        if (fixedTop !== undefined) {
            newState.affixStyle = {
                position: 'fixed',
                top: fixedTop,
                width: placeholderReact.width,
                height: placeholderReact.height,
            };
            newState.placeholderStyle = {
                width: placeholderReact.width,
                height: placeholderReact.height,
            };
        }

        this.setState({ affixStyle: newState.affixStyle, placeholderStyle: newState.placeholderStyle });
    };

    savePlaceholderNode = (node) => {
        this.placeholderNode = node;
    };

    saveFixedNode = (node) => {
        this.fixedNode = node;
    };

    getOffsetTop = () => {
        const { offsetBottom } = this.props;
        let { offsetTop } = this.props;
        if (offsetTop === undefined) {
            offsetTop = 0;
        }
        return offsetTop;
    };

    render() {
        const { offsetTop = 0, children } = this.props;
        const { affixStyle, placeholderStyle } = this.state;
        return (
            <div ref={this.savePlaceholderNode}>
                {
                    affixStyle && <div style={placeholderStyle} aria-hidden="true" />
                }
                <div style={affixStyle} ref={this.saveFixedNode}>
                    {children}
                </div>
            </div>
        );
    }
}

Affix.propTypes = {
    offsetTop: PropTypes.number
};

module.exports = Affix;