Badge 徽标数，图标右上角的圆形徽标数字

## API
| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| count | 展示的数字，大于 overflowCount 时显示为 ${overflowCount}+，为 0 时隐藏 | number | - |
| overflowCount | 展示封顶的数字值 | string | - |
| type | 设置 Badge 为状态点 | success | primary | info | warning | danger | - |
| className | 样式设置 | string | - |

```jsx
import { Badge } from 'corki-ui';

ReactDOM.render(
    <div>
        <Badge count={5}>
            <a href="#" className="head-example" />
        </Badge>
        <Badge count={99} overflowCount="999">
            <a href="#" className="head-example" />
        </Badge>
        <Badge count={5}></Badge>
    </div>,
    mountNode,
);
```
