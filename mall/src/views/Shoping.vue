<template>
  <el-container id="Home">
      <Header index='shoping'></Header>
      <div class="shopingList">
        <h1>购物车</h1>
        <el-table :data='list' style='width:100%'>
          <el-table-column prop='name' label='商品名' width='300'>
          </el-table-column>
          <el-table-column prop='number' label='价格' width='300'>
            <template slot-scope="scope">
              <span :key='key'>{{scope.row.price}}</span>
            </template>
          </el-table-column>
          <el-table-column prop='number' label='数量' width='300'>
            <template slot-scope="scope">
              <el-input-number v-model="list[scope.$index].number" :min="1" :max="10" label="描述文字" @change="handleChangeNumber(scope)"></el-input-number>
            </template>
          </el-table-column>
        </el-table>
        <div>
          <span>地址：</span>
          <el-cascader v-model="areaValue" :options='area'>

          </el-cascader>
          <el-button @click="handleClickClear">清空列表</el-button>
          <el-button @click="handleClickSubmit">提交订单</el-button>
          <el-dialog title="订单信息" :visible.sync='visibleBox' width='30%'>
          <el-table :data='list' style='width:100%'>
          <el-table-column prop='name' label='商品名' width='130'>
          </el-table-column>
          <el-table-column prop='number' label='价格' width='130'>
            <template slot-scope="scope">
              <span :key='key'>{{scope.row.price}}</span>
            </template>
          </el-table-column>
          <el-table-column prop='number' label='数量' width='130'>
          </el-table-column>
        </el-table>
        <span>地址：</span><span>{{areaValue.join('-')}}</span>
        <el-button @click="handleClickConfirm" style="float:right">确定</el-button>
          </el-dialog>
        </div>
      </div>
      <el-footer class="footer">
      </el-footer>
    </el-container>
</template>
<script>
import Header from '../components/Header.vue'
import {message} from 'element-ui' 
export default {
  components:{
    Header
  },
  data(){
    return {
      list:this.$store.state.commodityList,
      key:0,
      visibleBox:false,
      areaValue:[],
      area:[
        {
          value:'湖北省',
          label:'湖北省',
          children:[
            {
              value:'鄂州市',
              label:'鄂州市'
            },
            {
              value:'武汉市',
              label:'武汉市'
            },
            {
              value:'黄石市',
              label:'黄石市'
            }
          ]
        },
        {
          value:'北京',
          label:'北京',
          children:[
            {
              value:'北京市',
              label:'北京市'
            }
          ]
        },
        {
          value:'上海',
          label:'上海',
          children:[
            {
              value:'上海市',
              label:'上海市'
            }
          ]
        },
        {
          value:'广东省',
          label:'广东省',
          children:[
            {
              value:'深圳市',
              label:'深圳市'
            },
            {
              value:'广州市',
              label:'广州市'
            }
          ]
        },
        {
          value:'四川省',
          label:'四川省',
          children:[
            {
              value:'成都市',
              label:'成都市'
            }
          ]
        }
      ]
    }
  },
  methods:{
    handleChangeNumber(e){
      this.key++
    },
    handleClickClear(){
      this.list.splice(0,this.list.length)
    },
    handleClickSubmit(){
      if(!this.list.length){
      message({
      message:'您还没有购买商品',
      type:'error',
      duration:1000,
      center:true
      })
      return
      }
      if(!this.areaValue.length){
      message({
        message:'您还没有选择地址',
        type:'error',
        duration:1000,
        center:true
      })
      return
      }
      this.visibleBox=true
    },
    handleClickConfirm(){
      let number=0
      for(let i=0;i<this.list.length;i++){
          number+=this.list[i].price
      }
      message({
        message:`您总共消费了${number}`,
        type:'success',
        duration:3000,
        center:true
      })
      this.handleClickClear()
      this.visibleBox=false
    }
  },
  computed:{
  }
}
</script>
<style lang="scss">
.shopingList{
  width:1000px;
  margin: 0 auto;
  >div.title{
    display: flex;
    justify-content: space-between;
    background:black;
    color:white;
    width:100%;
    box-sizing: border-box;
    padding:0 60px;
    border-radius:10px 10px 0 0;
    height:40px;
    line-height: 40px;
    >span{
        display: inline-block;
        width:60px;
        text-align: center;
      }
  }
  >h1{
    margin:20px 0;  
  }
  >ul{
    list-style-type:none;
    >li{
      width:100%;
      box-sizing: border-box;
      padding: 0 60px;
      display: flex;
      justify-content: space-between;
      >span{
        display: inline-block;
        width:60px;
        text-align: center;
      }
    }
  }
}
</style>
