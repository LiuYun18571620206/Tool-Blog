
import React,{useEffect,useRef,useState}from 'react'
import echarts from 'echarts'
import {Button,Form,Radio,Modal} from 'antd'
import {DynamicFieldSetPie} from './DynamicFieldSet'
let myChart={
    target:null,
    TypeChangeA(){
        let obj=this.target.getOption()
        console.log(obj)
        if(!obj)return
        let change=obj.series.map((v,i)=>{
            return {
                ...v,roseType:''
            }
        })
        change={
            series:change
        }
        this.target.setOption(change)
    },
    TypeChangeB(){
        let obj=this.target.getOption()
        if(!obj)return
        let change=obj.series.map((v,i)=>{
            return {
                ...v,roseType:'radius'
            }
        })
        change={
            series:change
        }
        this.target.setOption(change)
    }
}
function Chart(prop){
    useEffect(()=>{
        myChart.target=echarts.init(target.current)
        prop.callBack(myChart.target,prop.index)
    },[])
    let target=useRef(null)
    let TypeChange=function(e){
        switch(e.target.value){
            case 'a':
                myChart.TypeChangeA()
                return
            case 'b':
                myChart.TypeChangeB()
                return
            default:
                throw new Error('切换错误')
        }
    }
return (
    <>
    <div>
        <Radio.Group defaultValue='a' onChange={TypeChange}>
            <Radio.Button value='a'>
                基本饼图
                </Radio.Button>
            <Radio.Button value='b'>
                层级饼图
                </Radio.Button>
        </Radio.Group>
    </div>
    <div className='echart' ref={target} style={{width:'100vw',height:'500px'}}>
        
    </div>
    </>
)
}
function Config(){
    let WrappedDynamicFieldSet=Form.create({name:'data-line'})(DynamicFieldSetPie)
    let [visible,usevisible]=useState(false)
    let visibleChange=function(){
        usevisible(!visible)
    }
    return (
        <div className='Line Config'>
            <div className='btn'>
            <Button type='primary' onClick={visibleChange}>帮助信息</Button>
            <Modal title='饼图使用帮助' visible={visible} onOk={visibleChange} onCancel={visibleChange}>
            <p>
                点击Add field按钮添加输入框
            </p>
            <p>第一个输入框用来写入饼图数量，格式为:a-b-c，这会显示三个饼图</p>
            <p>其余输入框用来写入饼图信息，信息数量必须和饼图数量一样</p>
            <p>饼图信息的写入格式为：a@100-200-50 a为数据名称 @之后是A数据在饼图中显示的信息，这里是A在三个饼图中的数据分别是100，200，50</p>
            </Modal>
            </div>
            <div className='form'>
                    <WrappedDynamicFieldSet></WrappedDynamicFieldSet>
            </div>
        </div>
    )
}

export {Chart,Config}