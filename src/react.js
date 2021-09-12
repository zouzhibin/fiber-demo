/**
 * 创建元素{虚拟DOM}的方法
 * @param {*} type 元素的类型 div span p
 * @param {*} props 配置对象 属性 key ref
 * @param  {...any} chidlren 放着所有的儿子 这里会做成一个数组
 */

import { configure } from "_@testing-library_dom@7.31.2@@testing-library/dom"
import { ELEMENT_TEXT } from "./constants"

function createElement(type,props,...chidlren){
    delete configure.__self
    delete configure.__source // 表示这个元素是在哪行哪列哪个文件生成的
    return {
        type,
        props:{
            // 做了一个兼容处理，如果是React元素的话返回自己，如果是文本类型，如果是一个字符串的话
            // 返回元素对象
            ...config,
            chidlren:chidlren.map(child=>{
                return typeof child==='object'?child:{
                    type:ELEMENT_TEXT,
                    props:{
                        text:child,chidlren:[]
                    }
                }
            })
        }
    }
}

const React = {
    createElement,
}
export default React