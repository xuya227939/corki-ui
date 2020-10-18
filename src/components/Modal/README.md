Modal 弹窗

## API
| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible | Modal是否显示 | bool | false |
| title | 弹窗标题 | string | 'test' |
| cancelText | 取消文案 | string | '取消' |
| confirmText | 确认文案 | string | '确认' |
| cancel | 取消回调 | Function |  |
| confirm | 确认回调 | Function |  |
| children | 内容 | React.node | 

```jsx
import { Modal, Button } from 'corki-ui';

class App extends React.Component {
    state = { visible: false };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Open Modal
                </Button>
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    confirm={this.handleOk}
                    cancel={this.handleCancel}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </div>
        );
    }
}

ReactDOM.render(<App />, mountNode);
```