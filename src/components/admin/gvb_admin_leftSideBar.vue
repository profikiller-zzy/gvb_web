<template>
  <aside class="gvb_admin_left_sideBar">

    <div class="gvb_admin_left_sideBar_header flex">
      <div class="gvb_admin_logo">
        <img src="http://rt8ywig7i.bkt.clouddn.com/background_1.jpg" alt="">
      </div>
      <div class="gvb_admin_title" align="center">profikiller的个人博客后台系统</div>
      <gvb_admin_left-side-bar_menu></gvb_admin_left-side-bar_menu>
    </div>

    <div class="gvb_admin_left_sideBar_body flex">
    </div>
  </aside>
</template>

<script>
import {defineComponent} from "vue";
import Gvb_admin_leftSideBar_menu from "@/components/admin/gvb_admin_leftSideBar_menu.vue";

export default defineComponent({
  components: {Gvb_admin_leftSideBar_menu}
})
</script>

<style lang="scss">
  .gvb_admin_left_sideBar{
    width: 240px;
    height: 100vh;
    background-color: var(--leftside);
    overflow-y: auto;
  }

  .gvb_admin_left_sideBar_header{
    width: 100%;
    height: 180px;
    flex-direction: column;
  }

  .gvb_admin_logo{
    padding-top: 20px;
    padding-left: 30px;

    img {
      width: 80%;
      height: 100%;
    }
  }

  .gvb_admin_title {
    margin-top: 20px;
    font-size: 16px;
    color: var(--tetx);
  }
</style>