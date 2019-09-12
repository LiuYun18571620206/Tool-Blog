
import React,{useEffect,useRef,useState}from 'react'
import echarts from 'echarts'
import {Button,Form,Radio,Modal} from 'antd'
import {DynamicFieldSetLine} from './DynamicFieldSet'
let myChart={
    target:null,
    TypeChangeA(){
        let obj=this.target.getOption()
        console.log(obj)
        if(!obj)return
        obj.series=obj.series.map((v,i)=>{
            return {
                name:v.name,
                type:v.type,
                data:v.data,
                smooth:false,
                areaStyle:{
                    opacity:0
                }                 
            }
        })
        this.target.setOption(obj)
    },
    TypeChangeB(){
        let obj=this.target.getOption()
        if(!obj)return
        obj.series=obj.series.map((v,i)=>{
            return {
                name:v.name,
                type:v.type,
                data:v.data,
                areaStyle: {opacity:0.8},           
            }
        })
        this.target.setOption(obj)
    },
    TypeChangeC(){
        let obj=this.target.getOption()
        console.log(obj)
        if(!obj)return
        obj.series=obj.series.map((v,i)=>{
            return {
                name:v.name,
                type:v.type,
                data:v.data,
                smooth:true,
                areaStyle:{
                    opacity:0
                }        
            }
        })
        this.target.setOption(obj)
    }
}
function Chart(prop){
    useEffect(()=>{
        myChart.target=echarts.init(target.current)
        console.log(myChart.target)
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
                基本折线图
                </Radio.Button>
            <Radio.Button value='b'>
                面积折线图
                </Radio.Button>
            <Radio.Button value='c'>
                平滑线图
                </Radio.Button>
        </Radio.Group>
    </div>
    <div className='echart' ref={target} style={{width:'100vw',height:'500px'}}>
        
    </div>
    </>
)
}
function Config(){
    let WrappedDynamicFieldSet=Form.create({name:'data-line'})(DynamicFieldSetLine)
    let [visible,usevisible]=useState(false)
    let visibleChange=function(){
        usevisible(!visible)
    }
    return (
        <div className='Line Config'>
            <div className='btn'>
            <Button type='primary' onClick={visibleChange}>帮助信息</Button>
            <Modal title='折线图使用帮助' visible={visible} onOk={visibleChange} onCancel={visibleChange}>
            <p>
                点击Add field按钮添加输入框
            </p>
            <p>第一个输入框用来写入信息点，格式为:a-b-c</p>
            <p>其余输入框用来写入折线信息，信息数量必须和信息点一样</p>
            <p>折线信息的写入格式为：a@100-200-50 a为折线名称 @之后是折线信息</p>
            </Modal>
            </div>
            <div className='form'>
                    <WrappedDynamicFieldSet></WrappedDynamicFieldSet>
            </div>
        </div>
    )
}

export {Chart,Config}