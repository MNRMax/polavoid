<script setup>
import { ref } from "vue"
import convertToBase64 from "../base64"

async function handleImage(event) {
    console.log(await convertToBase64(event.target.files[0]))
}
</script>

<template>
    <input type="file" accept="image/*" ref="image" @change="handleImage">
    <textarea placeholder="What's happening?"></textarea>
</template>

<style scoped>
textarea {
    font-size: 2rem;
    width: 90%;
    resize: none;
    height: 10rem;
    background-color: rgb(47, 47, 47);
    border: 2px white solid;
    border-radius: 10px;
    color: aliceblue;
}

h1 {
    color: aliceblue;
}
</style>