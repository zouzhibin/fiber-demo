// import React from 'react';
// import ReactDOM from 'react-dom';
//
// let element = (
//     <div id="A1">
//         <div id="B1">
//             <div id="C1"></div>
//             <div id="C2"></div>
//         </div>
//         <div id="B2"> </div>
//     </div>
// )
// console.log(JSON.stringify(element,null,2))
// ReactDOM.render(
//     element,
//   document.getElementById('root')
// );
//
// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


import element from "./element";
let container = document.getElementById('root')

// 下一个工作单元
// fiber 其实也是一个普通的JS对象
let nextUnitOfWork = {
    stateNode:container, // 此fiber对应的DOM节点
    props:{
        children:[element] // fiber的属性
    }
}

function workLoop(deadline){
    // 如果有当前的工作单元，就执行它，并返回一个工作单元 还有剩余的时间
    // while (nextUnitOfWork&&deadline.timeRemaining()>0){
    //     nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    // }
    while (nextUnitOfWork&&deadline.timeRemaining()>0){
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    }
}

/**
 * @fun 创建fiber树
 * beginWork 1、创建此fiber的真实DOM 通过虚拟DOM创建fiber结构
 * @param workingInProgressFiber
 */
function performUnitOfWork(workingInProgressFiber){
    // 1、创建真实DOM 并没有挂载 2、创建fiber子树
    beginWork(workingInProgressFiber)
    // 如果有儿子 返回儿子
    if(workingInProgressFiber.child){
        return workingInProgressFiber.child
    }


    while (workingInProgressFiber){
        // 如果没有儿子当前节点其实就已经结束完成了
        completeUnitOfWork(workingInProgressFiber)


        // // 如果没有儿子 找弟弟 返回弟弟
        if(workingInProgressFiber.sibling){
            return workingInProgressFiber.sibling
        }
        workingInProgressFiber = workingInProgressFiber.return // 先指向父亲  下一次循环找他的叔叔
    }

}
// 创建dom
function beginWork(workingInProgressFiber){
    console.log('beginWork',workingInProgressFiber.props.id)

    if(!workingInProgressFiber.stateNode){
        workingInProgressFiber.stateNode = document.createElement(workingInProgressFiber.type)
        for(let key in workingInProgressFiber.props){
            if(key!=='children'){
                workingInProgressFiber.stateNode[key]= workingInProgressFiber.props[key]
            }
        }
    } // 在beginWork 里是不会挂载的
    // 创建子fiber
    let previousFiber;
    // children是一个虚拟DOM的数组
    workingInProgressFiber.props.children.forEach((child,index)=>{
        let childFiber = {
            type:child.type,// DOM节点类型 div p
            props: child.props,
            return:workingInProgressFiber,// 父节点
            effectTag:'PLACEMENT',// 这个fiber对应的DOM节点需要被插入到页中去 父DOM中去
            nextEffect:null // 下一个有副作用的节点
        }
        if(index===0){
            workingInProgressFiber.child = childFiber
        }else {
            previousFiber.sibling = childFiber
        }
        previousFiber = childFiber
    })
}

function completeUnitOfWork(workingInProgressFiber){
    console.log('completeUnitOfWork',workingInProgressFiber.props.id)
}

// 告诉浏览器在空闲的时间行 workLoop
requestIdleCallback(workLoop)


