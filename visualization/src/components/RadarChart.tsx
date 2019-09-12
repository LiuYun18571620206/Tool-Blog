
import React,{useEffect,useRef,useState}from 'react'
import echarts from 'echarts'
import {Button,Form,Radio,Modal} from 'antd'
import {DynamicFieldSetRadar} from './DynamicFieldSet'
let myChart={
    target:null,
    TypeChangeA(){
        let obj=this.target.getOption()
        if(!obj)return
        let legend=[]
        for(let i in obj.legend[0].selected){
            legend.push(i)
        }
        let change={
            tooltip: {},
            legend: {
                data:legend
            },
            radar: {
                // shape: 'circle',
                name: {
                    textStyle: {
                        color: '#fff',
                        backgroundColor: '#999',
                        borderRadius: 3,
                        padding: [3, 5]
                   }
                },
                indicator:obj.radar[0].indicator
            },
            series:obj.series   
        }
        change.series=change.series.map((v,i)=>{
            v.data=v.data.map((v,i)=>{
                return {
                    value:v.value,
                    name:v.name,
                    symbol:'none',
                }
            })
            return v
        })
        this.target.setOption(change,true)
    },
    TypeChangeB(){
        let obj=this.target.getOption()
        if(!obj)return
        let change={
            backgroundColor: '#161627',
            legend:{
                data:obj.legend.data,
                selectedMode:'single',
                textStyle:{
                    color:'#fff'
                }
            },
            radar:{
                name:{
                    textStyle: {
                        color: 'rgb(238, 197, 102)',
                        backgroundColor:''
                    }
                },
                shape:'circle',
                splitArea: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(238, 197, 102, 0.5)'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: [
                            'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
                            'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)',
                            'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)'
                        ].reverse()
                    }
                },
            },
            series:obj.series
        }
        change.series=change.series.map((v,i)=>{
            v.data=v.data.map((v,i)=>{
                return {
                    value:v.value,
                    name:v.name,
                    symbol:'none',
                    areaStyle:{
                        normal:{
                            opacity:0.1
                        }
                    },
                    lineStyle:{
                        normal:{
                            width:1,
                            opacity:0.5
                        }
                    }
                }
            })
            return v
        })
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
                基础雷达图
                </Radio.Button>
            <Radio.Button value='b'>
                AQI雷达图
                </Radio.Button>
        </Radio.Group>
    </div>
    <div className='echart' ref={target} style={{width:'100vw',height:'500px'}}>
        
    </div>
    </>
)
}
function Config(){
    let WrappedDynamicFieldSet=Form.create({name:'data-line'})(DynamicFieldSetRadar)
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
            <p>第一个输入框用来写入信息点，格式为:a-b-c,默认的最大值是1000,可以手动设置最大值，格式为a{'&'}10000-b{'&'}5000-c{'&'}3000</p>
            <p>其余输入框用来写入雷达图信息，信息数量必须和信息点一样</p>
            <p>雷达信息的写入格式为：a@100-200-50 a为雷达线名称 @之后是雷达信息</p>
            </Modal>
            </div>
            <div className='form'>
                    <WrappedDynamicFieldSet></WrappedDynamicFieldSet>
            </div>
        </div>
    )
}

export {Chart,Config}