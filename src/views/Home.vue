<template>
  <div>
    <PxAssetsTable v-bind:assest="assets" />
  </div>
</template>

<script>
import api from "@/api";
// import getAssets from "@/api";
import PxAssetsTable from "@/components/PxAssetsTable";

export default {
  name: "Home",
  components: { PxAssetsTable  },
  data() {
    return {
      assets: [],
    };
  },
  created() {
    api.getAssets()
    .then((assets) => (this.assets = assets))
  }
};
</script>
