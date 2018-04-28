<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
  import { Navbar, Sidebar, AppMain } from 'views/layout'
  import axios from 'axios'

  export default {
    name: 'layout',
    components: {
      Navbar,
      Sidebar,
      AppMain
    },
    mounted() {
      axios.get('/api/user/page')
        .then((response) => {
          /* console.log(response)*/
        })
        .catch((error) => {
          console.log(error)
        })
    },
    computed: {
      sidebar() {
        return this.$store.state.app.sidebar
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    /* top: 115px;*/
    min-height: 850px;
    &.hideSidebar {
      .sidebar-container {
        width: 36px;
        overflow: inherit;
      }
      .main-container {
        margin-left: 36px;
      }
    }
    .sidebar-container {
      transition: width 0.28s ease-out;
      width: 180px;
      height: 100%;
      /* position: fixed;*/
      position: absolute;
      top: 0;
      /*top: 250px;*/
      bottom: 0;
      left: 0;
      z-index: 1001;
      overflow-y: auto;
      &::-webkit-scrollbar {
        display: none
      }
    }
    .main-container {
      min-height: 100%;
      transition: margin-left 0.28s ease-out;
      margin-left: 180px;
    }
  }
</style>
