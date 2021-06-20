<template>
    <button 
    v-on:click="click"
    class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-2 border border-green-500 hover:border-transparent rounded">
        <beat-loader :loading="loading" :size="8" :color="'#68d391'" />
        <p  v-show="!loading">
            <slot></slot>
        </p>
    </button>
</template>
<script>
    export default {
        name: 'Pbotton',
        methods: {
            click() {
                this.$emit('click')
            }
        },
        props: {
            loading: {
                type: Boolean,
                default: false
            }
        }
    }
</script>
