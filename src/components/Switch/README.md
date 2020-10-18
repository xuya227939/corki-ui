Switch 开关

## API
| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| checked | 指定当前是否选中 | boolean | false |
| onChange | 变化时回调函数 | func | |
| className | Switch 器类名 | string | |
| defaultChecked | 初始是否选中 | boolean | false |
| disabled | 是否禁用 | boolean | false |

```jsx
import { Switch } from 'corki-ui';

function onChange(checked) {
  console.log(`switch to ${checked}`);
}

ReactDOM.render(<Switch onChange={onChange} />, mountNode);
```