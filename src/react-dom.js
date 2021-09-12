import {TAG_ROOT} from './constants'
/**
 * render 是要把一个元素渲染到一个容器内部
 */
function render(element,container){
    let rootFiber = {
        tag:TAG_ROOT,// 每个fiber会有一个tag标识 此元素的类型
        // // 一般情况下如果这个元素是一个原生节点的话，stateNode指向真实的DOM元素
        stateNode:container,
        // props.children 是一个数组 里面放的是React元素 虚拟DOM后面会根据每个React元素创建对应的Fiber
        props:{
            // 这个fiber的属性对象children属性，里面放的是要渲染的元素
            children:[element]
        }
    }
    scheduleRoot(rootFiber)
}

const ReactDOM = {
    render
}
export default ReactDOM