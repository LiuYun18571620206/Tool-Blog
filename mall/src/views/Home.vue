<template>
<el-container id="Home">
      <Header index='home'></Header>
      <el-container>
      <el-aside class="aside">
        <el-tree :data='data' empty-text='none' @node-click='handleTreeClick'></el-tree>
      </el-aside>
      <el-main class="commodity">
        <div v-for='(v) in Tree' :key="v.name" class="card" shadow='hover' @click="handleClickShoping">
          {{v.name}}
          </div>
      </el-main>
      </el-container>
      <el-footer class="footer">
      </el-footer>
    </el-container>
</template>

<script>
// @ is an alias to /src
import Header from '../components/Header.vue'
import {message} from 'element-ui' 
export default {
  name: 'home',
  components: {
    Header
  },
  data(){
    return {
      data:[
        {
          label:'帽子',
          children:[
            {label:'鸭舌帽'},
            {label:'蘑菇帽'},
            {label:'坚强帽'}
          ]
        },
        {
          label:'衣服',
          children:[
            {label:'lolita'},
            {label:'JK'},
            {label:'旗袍'}
          ]
        },
        {
          label:'裤子',
          children:[
            {label:'破洞裤'},
            {label:'短裤'},
            {label:'牛仔裤'}
          ]
        },
        {
          label:'鞋子',
          children:[
            {label:'运动鞋'},
            {label:'休闲鞋'},
            {label:'皮鞋'}
          ]
        }
      ],
      tree:[],
      pageNumber:1
    }
  },
  methods:{
    handleTreeClick(obj,note,element){
      let arry=[]
      this.traversingTree(obj,arry)
      this.tree=arry
    },
    traversingTree(obj,arry){
      if(!obj.children){
        arry.push(obj.label)
      }else{
        obj.children.forEach((v,i)=>{
          return this.traversingTree(v,arry)
        })
      }
    },
    handleClickShoping(e){
      let target=e.target
      let arry=Array.from(target.parentNode.childNodes)
      let index=arry.indexOf(target)
      target=this.tree[index]
      this.$store.commit('addCommodityList',target)
      message({
      message:'加入购物车成功',
      type:'success',
      duration:1000,
      center:true
      })
    }
  },
  mounted(){
    
  },
  computed:{
    Tree:{
      get(){
      let arry=[]
      if(!this.tree.length){
        return arry
      }
      if(this.tree.length>1){
        let random=()=>Math.floor(Math.random()*this.tree.length) 
        for(let i=1;i<13;i++){
          let a={name:this.tree[random()]+(i*this.pageNumber),number:1,_price:i}
          Object.defineProperty(a,'price',{
            get(){
            return this.number*this._price
          }})
          arry.push(a)
        }
        this.tree=arry
        return arry
      }else{
        for(let i=1;i<13;i++){
          let a={name:this.tree[0]+(i*this.pageNumber),number:1,_price:i}
          Object.defineProperty(a,'price',{
            get(){
            return this.number*this._price
          }})
          arry.push(a)
        }
        this.tree=arry
        return arry
      }
    },
    set(newVlaue,oldValue){
      console.log(newVlaue)
    }
  }
  }
}
</script>

<style lang="scss">
#Home{
  >.header{
    background:#409EFF;
    padding:0 100px;
    >.link{
      display: inline-block;
      padding:0 20px;
      text-align: center;
      line-height: 60px;
     height: 100%; 
    }
  }
  .commodity{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    >.card{
      border:1px solid rgba(0,0,0,0.1);
      background:white;
      border-radius:5px;
      width:160px;
      height:200px;
      margin:20px 50px;
      text-align: center;
      line-height: 200px;
      cursor: pointer;
      transition: box-shadow 0.4s;
      &:hover{
        box-shadow:0 0px 10px 0px rgba(0,0,0,0.1);
      }
    }
  }
}
</style>
