<template>
  <div id="app">
    <div class="navbar-container" id="navbar-container">
      <div class="pull-left">
        <div style="" id="logo">
          <img :src="log" alt="log">
        </div>
      </div>
      <!-- /.navbar-header -->
      <div class="navbar-header pull-right" style="padding-top: 30px;" role="navigation">
        <ul class="nav ace-nav">
          <li class="grey"><a data-toggle="dropdown" title="待办" id="myTitle1" class="dropdown-toggle" href="#">
            <i class="icon-tasks" id="myTy"></i><span class="badge badge-grey daibancoutnum"></span>

          </a>
          </li>
          <li class="purple"><a data-toggle="dropdown" title="预警" id="myTitle2" class="dropdown-toggle" href="#">
            <i class="icon-bell-alt icon-animated-bell" id="myTe"></i><span
            class="badge badge-important yujingcountnum"></span> </a>
            <ul class="pull-right dropdown-navbar navbar-pink dropdown-menu dropdown-caret dropdown-close ExcMessage">
            </ul>
          </li>
          <li class="green"><a data-toggle="dropdown" title="异常" id="myTitle3" class="dropdown-toggle" href="#">
            <i class="icon-bolt icon-animated-vertical" id="myTs"></i><span
            class="badge badge-success mescoutnum"></span></a>
            <ul class="pull-right dropdown-navbar dropdown-menu dropdown-caret dropdown-close ulMessage">
            </ul>
          </li>
          <li class="light-blue"><a data-toggle="dropdown" href="#" class="dropdown-toggle">
            <!--<img class="nav-user-photo" src="" alt="Jason's Photo">-->
            <span id="spanUser" class="user-info"><small></small><span id="CurrentUser"></span></span><i
            class="icon-caret-down"> </i></a>
            <ul class="user-menu pull-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
              <li><a href="#"><i class="icon-cog"></i> </a></li>
              <li><a href="javascript:EventLab('xgmm');"><i class="icon-user"></i> </a></li>
              <li class="divider"></li>
              <li><a href="javascript:EventLab('zx');"><i class="icon-off"></i> </a></li>
              <li><a href="javascript:EventLab('tuiChuzx');"><i class="icon-off"></i></a></li>
            </ul>
          </li>
        </ul>
        <!-- /.ace-nav -->
      </div>
      <!-- /.navbar-header -->
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import log from '@/assets/log/log.jpg'

  export default {
    name: 'APP',
    data() {
      return {
        log: log + '?' + +new Date()
      }
    }
  }
</script>

<style lang="scss">
  @import '~normalize.css/normalize.css';
  // normalize.css 样式格式化
  @import './styles/index.scss'; // 全局自定义的css样式
</style>
<style scoped>
  .banner {
    /* position: fixed;*/
    width: 100%;
    height: 115px;
    background-color: royalblue;
  }

  #navbar-container {
    width: 100%;
    height: 115px;
    background: url('./assets/log/bg_banner.jpg');
    padding-left: 10px;
    padding-right: 20px;
  }

  #logo {
    z-index: 10000;
    width: 687px;
    height: 115px;
   /* background: url('./assets/log/log.jpg');*/
  }

  #navbar-container:after {
    clear: both;
  }

  #navbar-container .pull-left {
    float: left;
  }

  #navbar-container .pull-left {
    float: left !important;
  }

  #navbar-container .pull-right {
    float: right;
  }

  #navbar-container .pull-right {
    float: right !important;
  }

  #navbar-container .navbar-header {
    float: left;
  }

  #navbar-container .ace-nav {
    height: 100%;
    margin: 0 !important;
  }

  #navbar-container .nav {
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
  }

  #navbar-container ul, ol {
    margin: 0 0 10px 25px;
    padding: 0;
  }

  #navbar-container ul, ol {
    margin-top: 0;
    margin-bottom: 10px;
  }

  #navbar-container ul, menu, dir {
    display: block;
    list-style-type: disc;
    -webkit-margin-before: 1em;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    -webkit-padding-start: 40px;
  }
</style>
