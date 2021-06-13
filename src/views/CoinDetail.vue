<template>
  <div class="flex-col">
    <div class="flex flex-col sm:flex-row justify-around items-center"> 
    <bounce-loader v-bind:color="'#68d391'" :loading="loading" :size="100"/>
    </div>
    <template v-if="!loading">
      <div class="flex flex-col sm:flex-row justify-around items-center">
        <div class="flex flex-col items-center">
          <img  v-bind:src="`https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`" v-bind:alt="asset.name">
          <h1 class="text-5xl">
            {{asset.name}}
            <small class="sm:mr-2 text-gray-500"> {{asset.symbol}}</small>
          </h1>
        </div>
        <div class="my-10 flex flex-col">
          <ul>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Ranking</b>
              <span>{{asset.rank}} </span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio actual</b>
              <span>{{asset.priceUsd | valueCripto}}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más bajo</b>
              <span>{{min | valueCripto}}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más alto</b>
              <span>{{max | valueCripto}}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio Promedio</b>
              <span>{{avg | valueCripto}}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Variación 24hs</b>
              <span>{{asset.changePercent24Hr | percentCripto}}</span>
            </li>
          </ul>
        </div>

        <div class="my-10 sm:mt-0 flex flex-col justify-center text-center">
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >Cambiar</button>

          <div class="flex flex-row my-5">
            <label class="w-full" for="convertValue">
              <input
                id="convertValue"
                type="number"
                class="text-center bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              />
            </label>
          </div>
        </div>
      </div>
      <line-chart class="my-10" :colors="['orange']"  xmin="xmin" xmax="xmax" :data="history.map(h =>[ h.date, parseFloat(h.priceUsd)])"/>
      <h3 class="text-xl my-10">Best exchanges rates</h3>
      <table>
        <tr class="border-b" v-for="market in markets" v-bind:key="`${market.exchangeId} - ${market.priceUsd}`">
          <td>
            <b>{{market.exchangeId}}</b>
          </td>
          <td>{{market.priceUsd | valueCripto}}</td>     
          <td>{{market.baseSymbol}} / {{market.quoteId}}</td>
          <td>
            <Pbotton 
            v-bind:loading="market.loading || false"
            v-on:click="getExchangesWeb(market)"
            v-if="!market.url"
            >
              <slot>Get link</slot>
            </Pbotton>
            <a 
            v-else
            class="hover:underline text-green-600" target="_blanck">
            {{market.url}}
            </a>
          </td>
        </tr>
      </table>
    </template>
  </div>
</template>

<script>
import api from '../api'
import Pbotton from "../components/Pbotton.vue";

export default {
    name: 'CoinDetail',
    data() {
      return {
        asset: {},
        history: [],
        loading: false,
        markets: []    

      }
    },
    components: {
      Pbotton
    },
    created() {
      this.getCoin()
    },
    computed: {
    // a computed getter
      //para invocarlas, debo ponerla en el template
      arrayHistory() {
        // console.log(this.history.map(h => h.priceUsd))
        return  this.history.map(h => h.priceUsd)

      },
      sum() {
        // console.log(this.arrayHistory.reduce((previous, current) => parseFloat(current) + parseFloat(previous)))
        // let sum = values.reduce((previous, current) => current += previous);
        return  this.arrayHistory.reduce((previous, current) => parseFloat(current) + parseFloat(previous));
      },

      avg() {
        // console.log( this.sum/this.arrayHistory.length)
        // let sum = values.reduce((previous, current) => current += previous);
        return  this.sum/this.arrayHistory.length;
      },

      min() {
        // `this` points to the vm instance
        // console.log(Math.min(...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))))
        return Math.min(...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))); 
      },
      max() {
        // `this` points to the vm instance
        // console.log(Math.max(...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))))
        return Math.max(...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))); 
      },
      prod() {
        // `this` points to the vm instance
        // console.log(this.history((a, b) => a + parseFloat(b.priceUsd), 0)/this.history.length)
        return (this.history.reduce((a, b) => a + parseFloat(b.priceUsd), 0) / this.history.length)      
      }
    },
    methods: {
      getExchangesWeb(exchange){
        this.$set(exchange, 'loading', true)
        return api.getExchanges(exchange.exchangeId)
        .then((res) => 
        {this.$set(exchange, 'url', res.exchangeUrl)
        })
        .finally(() => {
        this.$set(exchange, 'loading', false)
        })
      
      },
      getCoin() {
        // console.log('aqui');
        this.loading = true;
        const id = this.$route.params.id;
        // console.log(id, 'id');
        Promise.all([
        api.getAsset(id),
        api.getAssetHistory(id),
        api.getMarkets(id)
        ])
        .then(([asset, history, markets]) => {
          this.asset = asset
           this.history = history,
           this.markets = markets
          })
        .finally(() => this.loading = false)

      }
    },
}

</script>

<style scoped>
td {
  padding: 10px;
  text-align: center;
}
</style>