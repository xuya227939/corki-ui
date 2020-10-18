Checkbox 多选框

## API
| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultChecked | 初始是否选中 | boolean | false |
| disabled | 失效状态 | boolean | false |
| checked | 指定当前是否选中 | boolean | false |
| onChange | 变化时回调函数	 | Function(e:Event) |  |

```jsx
import { Checkbox } from 'corki-ui';

function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
}

ReactDOM.render(<Checkbox onChange={onChange}>Checkbox</Checkbox>, mountNode);
```