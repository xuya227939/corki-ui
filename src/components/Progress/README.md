Progress 进度条

## API
| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| strokeColor | 进度条颜色 | String | 'red' |
| percent | 进度条百分比 | number | 0 |

```jsx
import { Progress } from 'corki-ui';

ReactDOM.render(
    <div>
        <Progress strokeColor="red" percent={10} />
    </div>,
    mountNode,
);
```