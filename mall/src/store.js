import Vue from 'vue'
import Vuex from 'vuex'
import { isArray } from 'util';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    commodityList:[]
  },
  mutations: {
    //添加商品
    addCommodityList(state,target){
      if(isArray(target)){
        let arry=target.filter((v,i)=>{
        let index,n
          for(n=0;n<state.commodityList.length;n++){
            index=state.commodityList[n].name===v.name?true:false
            if(index){
              state.commodityList[n].number++
              return false
            }
          }
          return true
        })
        state.commodityList.push(...arry)
        return 
      }
        for(let i=0,index;i<state.commodityList.length;i++){
          index=state.commodityList[i].name===target.name?true:false
          if(index){
            state.commodityList[i].number++
            return
          }
        }
      state.commodityList.push(target)
    },
  },
  actions: {

  }
})
