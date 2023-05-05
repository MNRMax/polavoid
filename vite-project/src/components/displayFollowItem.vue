<script setup>
import { ref } from "vue"
import { supabase } from '../supabase'
import followingItem from "./followingItem.vue";

const props = defineProps({
    items: Array,
    header: String,
})

const profiles = ref()

async function getProfile() {
    const { data, error } = await supabase
        .from('profiles')
        .select()
        .in('id', props.items)
    return data
}
getProfile().then(thing => {
    profiles.value = thing;
})
</script>

<template>
    <div id="cover" @click="$emit('close')"></div>
    <div id="box">
        <div id="heading">
            <h1>{{ props.header }}</h1>
            <p id="exit" @click="$emit('close')">close</p>
        </div>
        <hr>
        <followingItem v-for="item in profiles" :profile="item" />
    </div>
</template>

<style scoped>
#box {
    position: fixed;
    background-color: rgb(36, 36, 36);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30vw;
    height: 70vh;
    text-align: center;
    border-radius: 2rem;
}

h1 {
    color: aliceblue;
    font-size: 2.5rem;
}

#exit {
    font-size: 2.2rem;
    color: aliceblue;
    font-family: 'Material Symbols Outlined';
    font-weight: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
    position: absolute;
    top: 0;
    right: 2rem;
}

#exit:hover {
    cursor: pointer;
}
#cover {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.7);
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
}
</style>