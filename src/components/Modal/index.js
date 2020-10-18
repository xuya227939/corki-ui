import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import './index.css';

const Modal = (props) => {
    const { children, title = 'test', cancelText = '取消', confirmText = '确认', visible = false, cancel, confirm } = props;
    return (
        <div>
            {
                visible &&
                <div>
                    <div className="corki-modal-wrapper">
                        <div className="corki-modal">
                            <div className="corki-modal-title">{title}</div>
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

Modal.propTypes = {
    visible: PropTypes.bool,
    title: PropTypes.string,
    cancelText: PropTypes.string,
    confirmText: PropTypes.string,
    cancel: PropTypes.func,
    confirm: PropTypes.func
};

module.exports = Modal;