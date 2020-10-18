import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
// 判断游览器
const USER_AGENT = navigator.userAgent;
class Preview extends React.Component {
    constructor(props) {
        super(props);
        // 是否按下
        this.isDown = false;
        this.IMG_WIDTH = 300;
        this.IMG_HEIGHT = 300;
        // 放大或缩小比例
        this.zoomOut = 0;
        this.state = {
            // 移动的时候，更改距离和放大缩小
            imgStyle: {
                position: 'relative',
                left: '0px',
                top: '0px'
            },
            // 放大缩小比例
            num: 0,
            // 是否显示缩小放大比例
            isShowRate: false,
        };
        // 图片按下事件
        this.handlerImgDown = this.handlerImgDown.bind(this);
        // 图片加载
        this.onload = this.onload.bind(this);
    }

    componentDidMount() {
        if (document.addEventListener && USER_AGENT.indexOf('Firefox') > -1) {
            document.addEventListener('DOMMouseScroll', this.onScroll, false);
        } else {
            document.body.onmousewheel = this.onScroll;
        }
    }

    // 销毁
    componentWillUnmount() {
        document.onmousemove = null;
        document.onmouseup = null;
        document.body.onmousewheel = null;
        document.removeEventListener('DOMMouseScroll', this.onScroll, false);
    };

    // 缩小或放大
    onScroll = (e) => {
        const { num, imgStyle } = this.state;
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
        // 如果比例达到100或者为1的时候，停止继续放大或缩小 > 0 放大, < 0 缩小
        if ((num === 100 && wheelDelta > 0) || (num === 1 && wheelDelta < 0)) {
            return;
        }
        // 计算放大或缩小比例
        this.zoomOut = (this.zoomOut + wheelDelta / wheelDeltaNumber);
        style.width = this.IMG_WIDTH * (1 + this.zoomOut) + 'px';
        style.height = this.IMG_HEIGHT * (1 + this.zoomOut) + 'px';
        style.top = imgStyle.top;
        style.left = imgStyle.left;
        style.position = 'relative';
        // 换算成百分比，显示
        if (this.zoomOut.toFixed(1) * 100 < 0) {
            rate = 10 + (this.zoomOut.toFixed(1) * 100) / 10;
        } else {
            rate = parseInt(this.zoomOut.toFixed(1) * 100);
        }
        // 不允许出现百分之0
        rate = rate === 0 ? rate = 10 : rate;
        this.setState({
            imgStyle: style,
            num: rate,
            isShowRate: true
        });
    }

    // 图片按下事件
    handlerImgDown = (e) => {
        e.preventDefault();
        const corkiImg = document.getElementsByClassName('corki-img');
        this.isDown = true;
        this.currentX = e.clientX;
        this.currentY = e.clientY;
        this.offsetLeft = parseInt(corkiImg[0].offsetLeft);
        this.offsetTop = parseInt(corkiImg[0].offsetTop);
        this.handlerImgMove();
        // 移除事件
        document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;
            this.isDown = false;
        };
    }

    // 图片移动
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
                this.setState({
                    imgStyle: style
                });
            }
        };
    }

    // 获取图片真实宽高
    onload = (e) => {
        this.IMG_WIDTH = e.target.width;
        this.IMG_HEIGHT = e.target.height;
    }

    render() {
        const { imgStyle, isShowRate, num } = this.state;
        const { url, onClose } = this.props;
        return (
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
                        <div className="corki-preview-tooltip">{num}%</div>
                    }
                    <div className="corki-preview-close" onClick={onClose}>
                        <img
                            alt="img"
                            width="32"
                            height="32"
                            src="https://sight-world.oss-cn-hangzhou.aliyuncs.com/corki-ui/close.png"
                        />
                    </div>
                </div>
                <div className="corki-preview-mask" />
            </div>
        );
    }
}

Preview.propTypes = {
    url: PropTypes.string,
    onClose: PropTypes.func
};

module.exports = Preview;