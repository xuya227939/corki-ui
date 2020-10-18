import React from 'react';
import PropTypes from 'prop-types';
import { createPopper } from '@popperjs/core';
import './index.css';
class Tooltip extends React.Component {
    constructor(props) {
        super(props);

        this.popperRef = React.createRef();

        this.state = { isToolTip: false };
    }

    componentDidMount() {

        const showEvents = ['mouseenter', 'focus'];
        const hideEvents = ['mouseleave', 'blur'];

        showEvents.forEach(event => {
            this.popperRef.current.addEventListener(event, this.show);
        });

        hideEvents.forEach(event => {
            this.popperRef.current.addEventListener(event, this.hide);
        });
    }

    create() {
        const tooltip = document.querySelector('#corki-tooltip');

        createPopper(this.popperRef.current, tooltip, {
            placement: this.props.placement || 'top',
            modifiers: [{
                name: 'offset',
                options: {
                    offset: [0, 8],
                },
            }, ],
        });
    }

    show = () => {
        this.setState({ isToolTip: true });
        this.create();
    }

    hide = () => {
        this.setState({ isToolTip: false });
    }

    render() {
        return (
            <div className="corki-popper" ref={this.popperRef}>
                {this.props.children}
                {
                    this.state.isToolTip &&
                    <div id="corki-tooltip" role="corki-tooltip">
                        {this.props.title || ''}
                        <div id="corki-arrow" data-popper-arrow></div>
                    </div>
                }
            </div>
        );
    }
}

module.exports = Tooltip;