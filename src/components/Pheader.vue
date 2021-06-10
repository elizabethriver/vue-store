<template>
    <header class="shadow w-screen">
        <nav class="flex items-center justify-between flex-wrap bg-green-400 p-6">
            <div class="flex items-center flex-shrink-0 text-white mr-6">
                <PxIcon class="m-4"/>
               <router-link 
               class="font-semibold text-xl tracking-tight"
               v-bind:to="{ name: 'Home' }"
               >
                    Platzi
               </router-link>

            </div>
            <div class="hidden sm:block w-full blok flex-grow lg:flex lg:items-center lg:wauto">
                <div  class="text-sm lg:flex-grow">
                    This is a record cripto
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
import PxIcon from '@/components/PxIcon'

export default {
    name: "Pheader",
    components: {PxIcon}
}
</script>
