<template>
  <link rel="stylesheet" href="https://cdn.bootcdn.net/ajax/libs/ant-design-vue/2.2.2/antd.min.css">
  <div class="gvb_admin">
    <gvb-admin-left-side-bar></gvb-admin-left-side-bar>

    <div class="main">
      <header>

        <div class="header-left">
          <a-breadcrumb>
            <a-breadcrumb-item>首页</a-breadcrumb-item>
            <a-breadcrumb-item><a href="#">个人中心</a></a-breadcrumb-item>
            <a-breadcrumb-item><a href="#">用户列表</a></a-breadcrumb-item>
          </a-breadcrumb>
        </div>

        <div class="header-right">
          <div class="icon-actions">
            <i class="fa fa-home"></i>
            <gvb-theme></gvb-theme>
            <GvbFullScreen></GvbFullScreen>
          </div>
          <GvbUserInfo :is-avatar-display="true"></GvbUserInfo>
        </div>

      </header>
      <div class="tabs">

      </div>

      <main>
        <div class="router-view">
          <router-view/>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import GvbTheme from "../../components/common/gvb_theme.vue";
import GvbAdminLeftSideBar from "../../components/admin/gvb_admin_leftSideBar.vue";
import GvbFullScreen from "../../components/common/gvb_full_screen.vue";
import GvbUserInfo from "../../components/common/gvb_user_info.vue";

// 常量都用大写开头定义
</script>

<style lang="scss">
.gvb_admin{
  width: 100%;
  display: flex;
  flex-direction: row;


  .main{
    width: calc(100% - 240px);

    header{
      padding: 0 20px;
      height: 60px;
      background-color: var(--header-bg);
      display: flex;
      justify-content: space-between;
      align-items: center; // 排列在当前列的中间位置

      .header-left {

      }

      .header-right {

        display: flex;
        align-items: center;

        .icon-actions{
          margin-right: 20px;

          i {
            margin-left: 10px;
            cursor: pointer;
            font-size: 16px;
            color: var(--tetx);
          }

          i:hover {
            color: var(--active);
          }
        }
      }
    }

    .tabs{
      height: 30px;
      background-color: var(--menu-bg);
    }

    main {
      background-color: var(--bg);
      height: calc(100vh - 90px);
      padding: 20px;

      .router-view {
        background-color: var(--router-view-bg);
      }
    }

  }
}
</style>
