图形验证码。

## API
| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| getNumbers | 获取验证码 | Array |  |
| height | 高度 | string | '40' |
| width | 宽度 | string | '192' |

```jsx
import { VerificationCode } from 'corki-ui';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    getNumbers = (num) => {
        console.log(num);
    }

    render() {
        return (
            <div>
                <VerificationCode getNumbers={this.getNumbers} />
            </div>
        );
    }
}

ReactDOM.render(<App />, mountNode);
```