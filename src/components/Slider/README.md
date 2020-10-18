Slider 滑动输入条

## API
| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | 设置初始取值 | number | 0 |
| disabled | 值为 true 时，滑块为禁用状态 | boolean | false |
| max | 最大值 | number | 100 |
| min | 最小值 | number | 0 |
| step | 步长，取值必须大于 0，并且可被 (max - min) 整除。当 marks 不为空对象时，可以设置 step 为 null，此时 Slider 的可选值仅有 marks 标出来的部分 | number | 1 |
| onChange | 当 Slider 的值发生改变时，会触发 onChange 事件，并把改变后的值作为参数传入 | (value) => void | - |

```jsx
import { Slider } from 'corki-ui';

ReactDOM.render(
    <>
        <Slider defaultValue={30} />
    </>,
    mountNode,
);
```