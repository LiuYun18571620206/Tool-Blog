const initialState = {
    data:{
        key:[],
        value:[]
    },
    chart:[]
  };

  function todoApp(state=initialState, action) {
    switch(action.type){
        case 'CHANGE':
        state.chart[action.value.index].setOption(action.value.option)
        return {...state}
        case 'addChart':
        return {...state,chart:action.value}
        default:
        return state
    }
  }
  export default todoApp