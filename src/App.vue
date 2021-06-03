<template>
  <main>
    <Pheader />
    <PxAssetsTable />
  </main>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import Pheader from "./components/Pheader.vue";
import PxAssetsTable from "./components/PxAssetsTable.vue";

export default {
  name: "App",
  components: {
    Pheader,
    PxAssetsTable

  },
};
</script>

<style src="./assets/css/tailwind.css">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
