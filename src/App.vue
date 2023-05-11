<template>
  <router-view/>
</template>

<script setup>
import {useGlobalStore} from "@/stores/global_store";

const globalStore = useGlobalStore()

globalStore.loadUserInfo()
</script>

<style lang="scss">

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

:root {
  --active: ＃00BFFF;
  --tetx: ＃00BFFF;
}
</style>
