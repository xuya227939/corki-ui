Message 全局展示操作反馈信息

## API
| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| open('test', 3) | 打开全局消息通知 | Function |  |
| destroy | 清除所有消息通知 | Function |  |

```jsx
import { message, Button } from 'corki-ui';

const messageShow = () => {
    message.open('hello', 3);
}

ReactDOM.render(
    <Button type="primary" onClick={this.messageShow}>
        Display normal message
    </Button>,
    mountNode,
);
```