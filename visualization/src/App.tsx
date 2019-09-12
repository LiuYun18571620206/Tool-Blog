import 'core-js';
import React,{useState} from 'react'
import ReactDom from 'react-dom'
import {Route,HashRouter,Switch} from 'react-router-dom'
import './index.scss'
import 'antd/dist/antd.css'
import {Tabs,Drawer,notification} from 'antd'
import {Chart as LineChart,Config as LineConfig} from './components/lineChart'
import {Chart as ColumnChart,Config as ColumnConfig} from './components/ColumnChart'
import {Chart as PieChart,Config as PieConfig} from './components/PieChart'
import {Chart as RadarChart,Config as RadarConfig} from './components/RadarChart'
import store from './redux/Store'
function App(){
    const {TabPane}=Tabs
    let [showDrawer,useshowDrawer]=useState(false)
    let [tabIndex,usetaIndex]=useState(0)
    let [chart,usechart]=useState([])
    let spaceDown=function(e){
      if (e.keyCode === 32){
        useshowDrawer(!showDrawer)
    }
    }
    let openNotificationWithIcon=type=>{
      notification[type]({
        message: '使用指南',
        description:
          '按空格键调出控制台，再按Esc键关闭控制台',
        placement:'bottomLeft',
        duration:null
        },
      )
    }
    let callBack=function(echart,index){
      let i=[...chart]
      i[index]=echart
      usechart(i)
      store.dispatch({
        type:'addChart',
        value:i
      })
    }
    let onChange=function(key){
      usetaIndex(Number(key))
    }
    let onClose=function(){
      useshowDrawer(!showDrawer)
    }
    window.onload=function(e){
     document.addEventListener('keydown',spaceDown) 
     openNotificationWithIcon('info')
    }
    return (    
        <>
    <Tabs defaultActiveKey="0" onChange={onChange}>
    <TabPane tab="折线图" key="0">
      <LineChart callBack={callBack} index={0}/>
    </TabPane>
    <TabPane tab="柱状图" key="1">
      <ColumnChart callBack={callBack} index={1}/>
    </TabPane>
    <TabPane tab="饼图" key="2">
      <PieChart callBack={callBack} index={2}/>
    </TabPane>
    <TabPane tab="雷达图" key="3">
      <RadarChart callBack={callBack} index={3}/>
    </TabPane>
  </Tabs>
  <Drawer title="控制数据"
          placement="right"
          closable={false}
          onClose={onClose}
          visible={showDrawer}
          keyboard={true}
          width='600px'
          >
            {tabIndex===0?<LineConfig/>:tabIndex===1?<ColumnConfig />:tabIndex===2?<PieConfig/>:tabIndex===3?<RadarConfig/>:null}
            </Drawer>
        </>
    )
}
ReactDom.render(
<HashRouter>
<App />
</HashRouter>
,document.querySelector('#root'))