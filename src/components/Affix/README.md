Affix 图钉，将页面元素钉在可视范围

## API
| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| offsetTop | 距离窗口顶部达到指定偏移量后触发	 | number | 0 |

```jsx
import { Affix, Button } from 'corki-ui';

ReactDOM.render(
    <div>
        <Affix offsetTop={20}>
            <Button type="primary">
                Affix top
            </Button>
        </Affix>
    </div>,
    mountNode,
);
```