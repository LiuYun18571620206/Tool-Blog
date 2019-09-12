<template>
<el-header class="header">
        <router-link to='/' :class="{link:true,headerFocus:index==='home'}">商城</router-link>
        <router-link to='/shoping' :class="{link:true,headerFocus:index==='shoping'}">购物车</router-link>
</el-header>    
</template>
<script>
export default {
    name:'Header',
    props:['index']
}
</script>
<style lang="scss">
</style>
