import React,{useContext} from 'react'
import {Form, Input, Icon,Button,message} from 'antd'
import store from '../redux/Store'
let id=0
function DynamicFieldSetLine(props){
  let remove=k=>{
    const { form } = props;
    //获得input列表
      const keys = form.getFieldValue('keys');
      if (keys.length === 1) {
        return;
      }
    //删除input框
      form.setFieldsValue({
        keys: keys.filter(key => key !== k),
      });
  }
  let add = () => {
    const { form } = props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    form.setFieldsValue({
      keys: nextKeys,
    });
  };
  let handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const { keys, names } = values;
        let arry=keys.map(key => names[key])
        let legend=[]
        let axisX=[]
        let length
        let series=arry.map((v,i)=>{
          if(i===0){
            axisX=v.split('-')
            return 
          }
          if(v.indexOf('@')===-1){
            return
          }
          let number=v.substr(v.indexOf('@')+1).split('-').map(v=>isNaN(Number(v))?0:Number(v))
          let title=v.substr(0,v.indexOf('@'))
          legend.push(title)
          length=number.length
          return {
            name:title,
            type:'line',
            data:number,
          }
        })
        if(axisX.length!==length){
          message.error('数据格式不正确')
          return 
        }
        series.shift()
        store.dispatch({
          type:'CHANGE',
          value:{
            option:{
              title: {
                  text: '折线图堆叠'
              },
              tooltip: {
                  trigger: 'axis'
              },
              legend: {
                  data:legend
              },
              grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
              },
              toolbox: {
                  feature: {
                      saveAsImage: {}
                  }
              },
              xAxis: {
                  type: 'category',
                  boundaryGap: false,
                  data: axisX
              },
              yAxis: {
                  type: 'value'
              },
              series: series
          },
            index:0
          }
        })
      }
    });
  };
  const { getFieldDecorator, getFieldValue } = props.form;
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      };
      const formItemLayoutWithOutLabel = {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 },
        },
      };
      getFieldDecorator('keys', { initialValue: [] });
      const keys = getFieldValue('keys');
      const formItems = keys.map((k, index) => (
        <Form.Item
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? '显示数据' : ''}
          required={false}
          key={k}
        >
          {getFieldDecorator(`names[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [
              {
                required: true,
                whitespace: true,
                message: "Please input passenger's name or delete this field.",
              },
            ],
          })(<Input placeholder="passenger name" style={{ width: '60%', marginRight: 8 }} />)}
          {keys.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => remove(k)}
            />
          ) : null}
        </Form.Item>
      ));
      return (
        <Form onSubmit={handleSubmit}>
          {formItems}
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type="dashed" onClick={add} style={{ width: '60%' }}>
              <Icon type="plus" /> Add field
            </Button>
          </Form.Item>
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type="primary" htmlType="submit">
              提交信息
            </Button>
          </Form.Item>
        </Form>
      )
}
function DynamicFieldSetColumn(props){
  let remove=k=>{
    const { form } = props;
    //获得input列表
      const keys = form.getFieldValue('keys');
      if (keys.length === 1) {
        return;
      }
    //删除input框
      form.setFieldsValue({
        keys: keys.filter(key => key !== k),
      });
  }
  let add = () => {
    const { form } = props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    form.setFieldsValue({
      keys: nextKeys,
    });
  };
  let handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const { keys, names } = values;
        let arry=keys.map(key => names[key]),axisX=[],source,series
        series=arry.map((v,i)=>{
          if(i===0){
            axisX=v.split('-')
            axisX.unshift('product')
            return 
          }
          if(v.indexOf('@')===-1){
            return
          }
          let number=v.substr(v.indexOf('@')+1).split('-').map(v=>isNaN(Number(v))?0:Number(v))
          let title=v.substr(0,v.indexOf('@'))
          number.unshift(title)
          return number
        })
        series.shift()
        source=[axisX,...series]
        series=new Array(axisX.length-1).fill({type:'bar'})
        for(let i=1,length=source.length,firstLength=source[0].length;i<length;i++){
          if(source[i].length!==firstLength){
            message.error('数据格式不正确')
            break
          }
        }
        store.dispatch({
          type:'CHANGE',
          value:{
            option: {
              legend: {},
              tooltip: {},
              dataset: {
                  source: source
              },
              xAxis: {type: 'category'},
              yAxis: {},
              // Declare several bar series, each will be mapped
              // to a column of dataset.source by default.
              series: series
          },
            index:1
          }
        })
      }
    });
  };
  const { getFieldDecorator, getFieldValue } = props.form;
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      };
      const formItemLayoutWithOutLabel = {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 },
        },
      };
      getFieldDecorator('keys', { initialValue: [] });
      const keys = getFieldValue('keys');
      const formItems = keys.map((k, index) => (
        <Form.Item
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? '显示数据' : ''}
          required={false}
          key={k}
        >
          {getFieldDecorator(`names[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [
              {
                required: true,
                whitespace: true,
                message: "Please input passenger's name or delete this field.",
              },
            ],
          })(<Input placeholder="passenger name" style={{ width: '60%', marginRight: 8 }} />)}
          {keys.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => remove(k)}
            />
          ) : null}
        </Form.Item>
      ));
      return (
        <Form onSubmit={handleSubmit}>
          {formItems}
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type="dashed" onClick={add} style={{ width: '60%' }}>
              <Icon type="plus" /> Add field
            </Button>
          </Form.Item>
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type="primary" htmlType="submit">
              提交信息
            </Button>
          </Form.Item>
        </Form>
      )
}
function DynamicFieldSetPie(props){
  let remove=k=>{
    const { form } = props;
    //获得input列表
      const keys = form.getFieldValue('keys');
      if (keys.length === 1) {
        return;
      }
    //删除input框
      form.setFieldsValue({
        keys: keys.filter(key => key !== k),
      });
  }
  let add = () => {
    const { form } = props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    form.setFieldsValue({
      keys: nextKeys,
    });
  };
  let handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const { keys, names } = values;
        let arry=keys.map(key => names[key]),axisX=[],source,series
        series=arry.map((v,i)=>{
          if(i===0){
            axisX=v.split('-')
            axisX.unshift('product')
            return 
          }
          if(v.indexOf('@')===-1){
            return
          }
          let number=v.substr(v.indexOf('@')+1).split('-').map(v=>isNaN(Number(v))?0:Number(v))
          let title=v.substr(0,v.indexOf('@'))
          number.unshift(title)
          return number
        })
        series.shift()
        source=[axisX,...series]
        let average=300/(axisX.length-1),g=0
        let margin=()=>{
          let i=75/(axisX.length-1)+g
          g=i
          return i
        }
        series=new Array(axisX.length-1).fill('').map((v,i,arr)=>{
          return {
            type:'pie',
            radius:average,
            center:[margin()+'%','40%'],
            encode:{
              itemName:'product',
              value:axisX[i+1]
            }
          }
        })
        for(let i=1,length=source.length,firstLength=source[0].length;i<length;i++){
          if(source[i].length!==firstLength){
            message.error('数据格式不正确')
            break
          }
        }
        console.log(source,series)
        store.dispatch({
          type:'CHANGE',
          value:{
            option: {
              legend: {},
              tooltip: {
              },
              dataset: {
                  source: source
              },
              series: series,
              roseType:''
          },
            index:2
          }
        })
      }
    });
  };
  const { getFieldDecorator, getFieldValue } = props.form;
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      };
      const formItemLayoutWithOutLabel = {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 },
        },
      };
      getFieldDecorator('keys', { initialValue: [] });
      const keys = getFieldValue('keys');
      const formItems = keys.map((k, index) => (
        <Form.Item
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? '显示数据' : ''}
          required={false}
          key={k}
        >
          {getFieldDecorator(`names[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [
              {
                required: true,
                whitespace: true,
                message: "Please input passenger's name or delete this field.",
              },
            ],
          })(<Input placeholder="passenger name" style={{ width: '60%', marginRight: 8 }} />)}
          {keys.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => remove(k)}
            />
          ) : null}
        </Form.Item>
      ));
      return (
        <Form onSubmit={handleSubmit}>
          {formItems}
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type="dashed" onClick={add} style={{ width: '60%' }}>
              <Icon type="plus" /> Add field
            </Button>
          </Form.Item>
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type="primary" htmlType="submit">
              提交信息
            </Button>
          </Form.Item>
        </Form>
      )
}
function DynamicFieldSetRadar(props){
  let remove=k=>{
    const { form } = props;
    //获得input列表
      const keys = form.getFieldValue('keys');
      if (keys.length === 1) {
        return;
      }
    //删除input框
      form.setFieldsValue({
        keys: keys.filter(key => key !== k),
      });
  }
  let add = () => {
    const { form } = props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    form.setFieldsValue({
      keys: nextKeys,
    });
  };
  let handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const { keys, names } = values;
        let arry=keys.map(key => names[key]),indicator,source,series,legend=[]
        series=arry.map((v,i)=>{
          if(i===0){
            indicator=v.split('-')
            indicator=indicator.map((v,i)=>{
              if(v.indexOf('&')!==-1){
                v=v.split('&')
                let number=Number(v[1])
                return {
                  name:v[0],
                  max:number
                }
              }else{
                return {
                  name:v[0],
                  max:1000
                }
              }
            })
          }
          if(v.indexOf('@')===-1){
            return
          }
          let value=v.substr(v.indexOf('@')+1).split('-').map(v=>isNaN(Number(v))?0:Number(v))
          let name=v.substr(0,v.indexOf('@'))
          legend.push(name)
          return {
            value,
            name,
            symbol:'none'
          }
        })
        series.shift()
        series=[{
          name: '预算 vs 开销（Budget vs spending）',
          type: 'radar',
          // areaStyle: {normal: {}},
          data : series
      }]
        store.dispatch({
          type:'CHANGE',
          value:{
            option: {
              tooltip: {},
              legend: {
                  data: legend
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
                  indicator
              },
              series
          },
            index:3
          }
        })
      }
    });
  };
  const { getFieldDecorator, getFieldValue } = props.form;
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      };
      const formItemLayoutWithOutLabel = {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 },
        },
      };
      getFieldDecorator('keys', { initialValue: [] });
      const keys = getFieldValue('keys');
      const formItems = keys.map((k, index) => (
        <Form.Item
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? '显示数据' : ''}
          required={false}
          key={k}
        >
          {getFieldDecorator(`names[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [
              {
                required: true,
                whitespace: true,
                message: "Please input passenger's name or delete this field.",
              },
            ],
          })(<Input placeholder="passenger name" style={{ width: '60%', marginRight: 8 }} />)}
          {keys.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => remove(k)}
            />
          ) : null}
        </Form.Item>
      ));
      return (
        <Form onSubmit={handleSubmit}>
          {formItems}
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type="dashed" onClick={add} style={{ width: '60%' }}>
              <Icon type="plus" /> Add field
            </Button>
          </Form.Item>
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type="primary" htmlType="submit">
              提交信息
            </Button>
          </Form.Item>
        </Form>
      )
}
    export {DynamicFieldSetLine,DynamicFieldSetColumn,DynamicFieldSetPie,DynamicFieldSetRadar}