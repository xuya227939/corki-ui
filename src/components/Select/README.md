Switch 开关

## API
| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| checked | 指定当前是否选中 | boolean | false |
| onChange | 变化时回调函数 | func | |
| className | Switch 器类名 | string | |

```jsx
import { Select } from 'corki-ui';

const { Option } = Select;

function handleChange(value) {
    console.log(`selected ${value}`);
}

ReactDOM.render(
    <div>
        <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>
                Disabled
            </Option>
        </Select>
    </div>,
    mountNode,
);
```