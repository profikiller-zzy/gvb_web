<template>
  <div class="gvb_admin">
    <aside>
      <div class="icon-caidan"></div>

    </aside>

    <div class="main">
      <header>

      </header>
      <div class="tabs">

      </div>

      <main></main>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss">
.gvb_admin{
  width: 100%;
  display: flex;
  flex-direction: row;

  aside{
    flex-basis: 240px;
    height: 100vh;
    background-color: grey;
  }

  .main{
    width: calc(100% - 240px);

    header{
      height: 60px;
      background-color: aquamarine;
    }

    .tabs{
      height: 30px;
      background-color: white;
    }

    main {
      background-color: #f0eeee;
      height: calc(100vh - 90px);
    }

  }
}
</style>
