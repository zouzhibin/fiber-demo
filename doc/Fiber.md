## Fiber 执行阶段
- 每次渲染有两个阶段 ： Reconciliation(协调render阶段)和Commit(提交阶段)
    - 协调阶段：可以认为是Diff 阶段，这个阶段可以被中断，这个阶段会找出所有节点变更，例如节点新增、删除、属性变更等等，这些变更React 称之为副作用（Effect）
    - 提交阶段：将上一个阶段计算出来的需要处理的副作用（Effect）一次性执行了，这个阶段必须同步执行，不能被打断


## render 阶段
- 从顶点开始遍历
- 如果有第一个儿子，先遍历第一个儿子
- 如果没有第一个儿子，标志着此节点遍历完成
- 如果有弟弟遍历弟弟
- 如果没有下一个弟弟，返回父节点标识完成父节点遍历，如果有叔叔遍历叔叔
- 没有父节点遍历结束
- 先儿子，后弟弟，再叔叔，辈分越小越优先


- 什么时候一个节点遍历完成？没有子节点，或者所有子节点都遍历完成了
- 没爹了就表示全部遍历完成了



- firstEffect 指向第一个有副作用的子节点 lastEffect 指向最后一个有副作用的子节点