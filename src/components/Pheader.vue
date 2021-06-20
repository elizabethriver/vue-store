<template>
    <header class="shadow w-screen">
        <nav class="flex items-center justify-between flex-wrap bg-green-400 p-6">
            <div class="flex items-center flex-shrink-0 text-white mr-6">
                <PxIcon class="m-4"/>
               <router-link 
               class="font-semibold text-xl tracking-tight"
               v-bind:to="{ name: 'Home' }"
               >
                    Exchange Plus
               </router-link>

            </div>
            <div class="hidden sm:block w-full blok flex-grow lg:flex lg:items-center lg:wauto">
                <div  class="text-sm lg:flex-grow text-white mr-4">
                <router-link
                v-for="l in link"
                :key="l.title"
                :to="l.to" 
                class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-gray-900 mr-4" >
                {{l.title}}
                </router-link>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
import PxIcon from '@/components/PxIcon'

export default {
    name: "Pheader",
    components: {PxIcon},
    props: {
        links: Array,
        default: () => {

        }
    },
    data() {
        return {
            link: [
            {
            title: 'BTC',
            to: { name: 'CoinDetail', params: { id: 'bitcoin' } }
            },
            {
            title: 'ETH',
            to: { name: 'CoinDetail', params: { id: 'ethereum' } }
            },
            {
            title: 'XRP',
            to: { name: 'CoinDetail', params: { id: "xrp" } }
            }
        ]
        }
    }
}
</script>
