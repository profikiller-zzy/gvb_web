<template>
  <div class="admin">
    <admin_left_bar></admin_left_bar>

    <div class="admin_main">
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
</script>

<style lang="scss">
.admin{
  width: 100%;
  display: flex;
  flex-direction: row;


  .admin_main{
    width: calc(100% - 240px);

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