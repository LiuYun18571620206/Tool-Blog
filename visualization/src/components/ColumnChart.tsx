
import React,{useEffect,useRef,useState}from 'react'
import echarts from 'echarts'
import {Button,Form,Radio,Modal} from 'antd'
import {DynamicFieldSetColumn} from './DynamicFieldSet'
let myChart={
    target:null,
    TypeChangeA(){
        let obj=this.target.getOption()
        console.log(obj)
        if(!obj)return
        let change={
            yAxis:{
                type:'value'
            },
            xAxis:{
                type:'category'
            },
            dataZoom:[{
                type:'inside',
                disabled:true
            }]
        }
        this.target.setOption(change)
    },
    TypeChangeB(){
        let obj=this.target.getOption()
        if(!obj)return
        let change={
            yAxis:{
                type:'category'
            },
            xAxis:{
                type:'value'
            },
            dataZoom:[{
                type:'inside',
                disabled:true
            }]
        }
        this.target.setOption(change)
    },
    TypeChangeC(){
        let obj=this.target.getOption()
        console.log(obj)
        if(!obj)return
        let change={
            dataZoom:[{
                type:'inside',
                disabled:false
            }]
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
            case 'c':
                myChart.TypeChangeC()
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
                竖轴柱图
                </Radio.Button>
            <Radio.Button value='b'>
                横轴柱图
                </Radio.Button>
            <Radio.Button value='c'>
                缩放柱图
                </Radio.Button>
        </Radio.Group>
    </div>
    <div className='echart' ref={target} style={{width:'100vw',height:'500px'}}>
        
    </div>
    </>
)
}
function Config(){
    let WrappedDynamicFieldSet=Form.create({name:'data-line'})(DynamicFieldSetColumn)
    let [visible,usevisible]=useState(false)
    let visibleChange=function(){
        usevisible(!visible)
    }
    return (
        <div className='Line Config'>
            <div className='btn'>
            <Button type='primary' onClick={visibleChange}>帮助信息</Button>
            <Modal title='柱图使用帮助' visible={visible} onOk={visibleChange} onCancel={visibleChange}>
            <p>
                点击Add field按钮添加输入框
            </p>
            <p>第一个输入框用来写入每个时间点的柱数量，格式为:a-b-c</p>
            <p>其余输入框用来写入柱图时间点以及显示的柱图信息</p>
            <p>柱图信息的写入格式为：a@100-200-50 a为时间点 @之后是柱图信息 必须和柱图数量是一致的</p>
            </Modal>
            </div>
            <div className='form'>
                    <WrappedDynamicFieldSet></WrappedDynamicFieldSet>
            </div>
        </div>
    )
}

export {Chart,Config}