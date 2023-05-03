<script setup>
import { ref } from "vue"
import { supabase } from '../supabase'

const props = defineProps({
  items: Array,
})

const profiles = ref(undefined)

async function getProfile() {
    const { data, error } = await supabase
      .from('contacts')
      .select()
      .in('id', items)
    return data
}
getProfile().then(thing => {
    console.log(thing)
})
// console.log(profiles)
</script>

<template>
    <div id="box">
        <h1>Following</h1>
        <hr>
        <p v-for="item in profiles">{{ item }}</p>
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
h1{
    color: aliceblue;
}
</style>