import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import './index.css';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const { keyboard = true } = this.props;
        if(keyboard) document.addEventListener('keydown', this.sendCancel);
    }

    componentWillUnmount() {
        const { keyboard = true } = this.props;
        if(keyboard) document.removeEventListener('keydown', this.sendCancel);
    }

    sendCancel = (e) => {
        if(e.keyCode === 27) this.props.cancel();
    }

    render() {
        const { children, title = 'test', cancelText = '取消', confirmText = '确认', visible = false, cancel, confirm } = this.props;

        if(visible) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
        } else {
            document.body.style.overflow = 'auto';
            document.body.style.position = 'static';
        }

        return (
            <div>
                {
                    visible &&
                    <div>
                        <div className="corki-modal-wrapper">
                            <div className="corki-modal">
                                <div className="corki-modal-header">
                                    <div className="corki-modal-title">{title}</div>
                                    <div className="corki-modal-close" onClick={cancel}>
                                        <img
                                            alt="img"
                                            width="16"
                                            height="16"
                                            src="//sight-world.oss-cn-hangzhou.aliyuncs.com/corki-ui/close-gray.png"
                                        />
                                    </div>
                                </div>
                                <div className="corki-modal-content">{children}</div>
                                <div className="corki-modal-operator">
                                    <button className="corki-modal-operator-cancel" onClick={cancel}>{cancelText}</button>
                                    <button className="corki-modal-operator-confirm" onClick={confirm}>{confirmText}</button>
                                </div>
                            </div>
                        </div>
                        <div className="corki-mask"></div>
                    </div>
                }
            </div>
        );
    }
}

Modal.propTypes = {
    visible: PropTypes.bool,
    title: PropTypes.string,
    cancelText: PropTypes.string,
    confirmText: PropTypes.string,
    cancel: PropTypes.func,
    confirm: PropTypes.func,
    keyboard: PropTypes.bool
};

module.exports = Modal;