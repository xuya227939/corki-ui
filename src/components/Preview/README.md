Preview 图片预览，可缩小、放大、拖拽。

## API
| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| url | 图片链接，必须是在网络上能够打开 | string |  |
| onClose | 关闭方法 | func | |
| keyboard | 是否支持键盘 esc 关闭 | boolean | true |

```jsx
import { Preview, Button } from 'corki-ui';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowPreView: false
        }
    }

    showPreview = () => {
        this.setState({
            isShowPreView: true
        });
    }

    onClose = () => {
        this.setState({
            isShowPreView: false
        });
    }

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showPreview}>
                    Open Preview
                </Button>
                <Preview
                    url="//sight-world.oss-cn-hangzhou.aliyuncs.com/corki-ui/corki-ui-logo.jpeg"
                    onClose={this.onClose}
                    visible={this.state.isShowPreView}
                />
            </div>
        );
    }
}

ReactDOM.render(<App />, mountNode);
```