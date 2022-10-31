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

| 方案 | 技术栈是否能统一 | 单独打包 | 单独部署 | 子工程切换速度 | 工程间通信难度 | 现有工程侵入性 | 学习成本 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 路由分发式 | 是 | 是 | 是 | 慢 | 难 | 高 | 低
| iframe | 是 | 是 | 是 | 慢 | 高 | 高 | 低
| qiankun/micro-app/... | 是 | 是 | 是 | 正常 | 正常 | 低 | 低
| Web Components | 是 | 是 | 是 | 快 | 高 | 高 | 高
