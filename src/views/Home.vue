<template>
  <div>
    <bounce-loader v-bind:color="'#68d391'" :loading="loading" :size="100"/>
    <PxAssetsTable v-if="!loading" v-bind:assets="assets" />
  </div>
</template>

<script>
import api from '@/api'
import PxAssetsTable from '@/components/PxAssetsTable'

export default {
  name: 'Home',

  components: { PxAssetsTable  },

  data() {
    return {
      assets: [],
      loading: false,    
    }
  },
  
  created() {
    this.loading = true,
    api.getAssets().then(assets => (this.assets = assets))
    .finally(() => this.loading = false)
  }
}
</script>
