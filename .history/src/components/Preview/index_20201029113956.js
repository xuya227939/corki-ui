import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
// 判断游览器
const USER_AGENT = navigator.userAgent;
class Preview extends React.Component {
    constructor(props) {
        super(props);
        this.isDown = false;
        this.IMG_WIDTH = 300;
        this.IMG_HEIGHT = 300;
        this.zoomOut = 0;
        this.num = 0;
        this.rotate = 0;
        this.state = {
            imgStyle: {
                position: 'relative',
                left: '0px',
                top: '0px',
                transform: 'rotate(0deg)'
            },
            isShowRate: false
        };
        this.handlerImgDown = this.handlerImgDown.bind(this);
        this.onload = this.onload.bind(this);
    }

    componentDidMount() {
        if (document.addEventListener && USER_AGENT.indexOf('Firefox') > -1) {
            document.addEventListener('DOMMouseScroll', this.onScroll, false);
        } else {
            document.body.onmousewheel = this.onScroll;
        }

        const { keyboard = true } = this.props;
        if(keyboard) document.addEventListener('keydown', this.sendCancel);
    }

    componentWillUnmount() {
        document.onmousemove = null;
        document.onmouseup = null;
        document.body.onmousewheel = null;
        document.removeEventListener('DOMMouseScroll', this.onScroll, false);

        const { keyboard = true } = this.props;
        if(keyboard) document.removeEventListener('keydown', this.sendCancel);
    }

    reset() {
        this.isDown = false;
        this.IMG_WIDTH = 300;
        this.IMG_HEIGHT = 300;
        this.zoomOut = 0;
        this.num = 0;
        this.rotate = 0;

        this.setState({
            imgStyle: {
                position: 'relative',
                left: '0px',
                top: '0px',
                transform: 'rotate(0deg)'
            },
            isShowRate: false
        });
    }

    sendCancel = (e) => {
        if(e.keyCode === 27) {
            this.reset();
            this.props.onClose();
        }
    }

    onScroll = (e) => {
        const { imgStyle } = this.state;
        const event = e || window.event;
        let style = {};
        let wheelDelta;
        let wheelDeltaNumber;
        let rate;

        // firefox and safari 的滚动轴值不一样，其余的都是1200
        if (USER_AGENT.indexOf('Firefox') > -1) {
            // wheelDelta = 3 or -3
            wheelDelta = event.detail;
            wheelDeltaNumber = 30;
        } else if (USER_AGENT.indexOf('Safari') > -1) {
            // wheelDelta = 360 or -360
            wheelDelta = event.wheelDelta;
            wheelDeltaNumber = 3600;
        } else {
            // wheelDelta = 120 or -120
            wheelDelta = event.wheelDelta;
            wheelDeltaNumber = 1200;
        }

        if ((this.num === 100 && wheelDelta > 0) || (this.num === 1 && wheelDelta < 0)) {
            return;
        }

        this.zoomOut = (this.zoomOut + wheelDelta / wheelDeltaNumber);
        style.width = this.IMG_WIDTH * (1 + this.zoomOut) + 'px';
        style.height = this.IMG_HEIGHT * (1 + this.zoomOut) + 'px';
        style.top = imgStyle.top;
        style.left = imgStyle.left;
        style.position = 'relative';
        style.transform = `rotate(${this.rotate}deg)`;

        if (this.zoomOut.toFixed(1) * 100 < 0) {
            rate = 10 + (this.zoomOut.toFixed(1) * 100) / 10;
        } else {
            rate = parseInt(this.zoomOut.toFixed(1) * 100);
        }

        rate = rate === 0 ? rate = 10 : rate;
        this.num = rate;
        this.setState({
            imgStyle: style,
            isShowRate: true
        });
    }

    handlerImgDown = (e) => {
        e.preventDefault();
        const corkiImg = document.getElementsByClassName('corki-img');
        this.isDown = true;
        this.currentX = e.clientX;
        this.currentY = e.clientY;
        this.offsetLeft = parseInt(corkiImg[0].offsetLeft);
        this.offsetTop = parseInt(corkiImg[0].offsetTop);
        this.handlerImgMove();
        document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;
            this.isDown = false;
        };
    }

    handlerImgMove = () => {
        document.onmousemove = (e) => {
            if (this.isDown) {
                const { imgStyle } = this.state;
                let style = {};
                style.width = imgStyle.width + 'px';
                style.height = imgStyle.height + 'px';
                style.left = e.clientX - (this.currentX - this.offsetLeft) + 'px';
                style.top = e.clientY - (this.currentY - this.offsetTop) + 'px';
                style.position = 'relative';
                style.transform = `rotate(${this.rotate}deg)`;
                this.setState({
                    imgStyle: style
                });
            }
        };
    }

    onload = (e) => {
        this.IMG_WIDTH = e.target.width;
        this.IMG_HEIGHT = e.target.height;
    }

    anticlockwise = () => {
        this.rotate += 45;

        const { imgStyle } = this.state;
        let style = {
            ...imgStyle,
            transform: `rotate(${this.rotate}deg)`
        };
        this.setState({ imgStyle: style });
    }

    clockwise = () => {
        this.rotate -= 45;

        const { imgStyle } = this.state;
        let style = {
            ...imgStyle,
            transform: `rotate(${this.rotate}deg)`
        };
        this.setState({ imgStyle: style });
    }

    render() {
        const { imgStyle, isShowRate } = this.state;
        const { url, onClose, visible = false } = this.props;

        if(visible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return (
            <div>
                {
                    visible && 
                    <div className="corki-preview">
                        <div className="corki-preview-content">
                            <div className="corki-preview-img">
                                <img
                                    draggable="false"
                                    alt="img"
                                    className="corki-img corki-select-cursor"
                                    onMouseDown={this.handlerImgDown}
                                    src={url}
                                    onLoad={this.onload}
                                    style={imgStyle}
                                />
                            </div>
                            {
                                isShowRate &&
                                <div className="corki-preview-tooltip">{this.num}%</div>
                            }
                            <div styleName="corki-preview-btn">
                                <img
                                    alt="img"
                                    width="32"
                                    height="32"
                                    styleName="corki-preview-btn-img"
                                    onClick={this.anticlockwise}
                                    src="//sight-world.oss-cn-hangzhou.aliyuncs.com/corki-ui/anticlockwise.png"
                                />
                                <img
                                    alt="img"
                                    width="32"
                                    height="32"
                                    styleName="corki-preview-btn-img"
                                    onClick={this.clockwise}
                                    src="//sight-world.oss-cn-hangzhou.aliyuncs.com/corki-ui/clockwise.png"
                                />
                                <img
                                    alt="img"
                                    width="24"
                                    height="24"
                                    styleName="corki-preview-btn-img"
                                    onClick={() => {
                                        this.reset();
                                        onClose();
                                    }}
                                    src="//sight-world.oss-cn-hangzhou.aliyuncs.com/corki-ui/close.png"
                                />
                            </div>
                        </div>
                        <div className="corki-preview-mask" />
                    </div>
                }
            </div>
        );
    }
}

Preview.propTypes = {
    url: PropTypes.string,
    onClose: PropTypes.func,
    visible: PropTypes.bool,
    keyboard: PropTypes.bool
};

module.exports = Preview;