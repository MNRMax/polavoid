<script setup>
import { ref } from "vue"
import convertToBase64 from "../base64"

async function handleImage(event) {
    console.log(await convertToBase64(event.target.files[0]))
}
</script>

<template>
    <input type="file" accept="image/*" ref="image" @change="handleImage">
    <textarea id="titleText" placeholder="Caption"></textarea>
    <textarea id="postText" placeholder="What's happening?"></textarea>
</template>

<style scoped>
textarea {
    resize: none;
    background-color: rgb(47, 47, 47);
    border: 2px white solid;
    border-radius: 10px;
    color: aliceblue;
    padding: 1rem;
}
#postText {
    font-size: 2rem;
    height: 10rem;
    width: 90%;
}
#titleText {
    font-size: 2rem;
    width: 90%;
    height: 3rem;
}

h1 {
    color: aliceblue;
}
</style>