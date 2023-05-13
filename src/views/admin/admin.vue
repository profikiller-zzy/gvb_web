<template>
  <div class="admin">
    <admin_left_bar></admin_left_bar>

    <div class="admin_main">
      <header>
        <div class="admin_main_header_left"></div>
        <div class="admin_main_header_right">
          <div class="icon-actions">
            <i class="fa fa-home"></i>
            <Gvb_theme></Gvb_theme>
            <gvb_full_screen></gvb_full_screen>
          </div>
        </div>
      </header>

      <main>
        <div class="router-view">
          <router-view/>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import Admin_left_bar from "@/components/admin/admin_left_bar.vue";
import Gvb_theme from "../../components/common/gvb_theme.vue";
import Gvb_full_screen from "../../components/common/gvb_full_screen.vue";
</script>

<style lang="scss">
.admin{
  width: 100%;
  display: flex;
  flex-direction: row;

  .admin_main{
    width: calc(100% - 240px);

    header {
      padding: 0 20px;
      height: 60px;
      background-color: var(--header-bg);
      display: flex;
      justify-content: space-between;
      align-items: center; // 排列在当前列的中间位置

      .admin_main_header_left {
      }

      .admin_main_header_right {
        display: flex;
        align-content: center;

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
}
</style>