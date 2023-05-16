<script setup>
import { ref } from "vue"
import convertToBase64 from "../base64"
import PostItem from "../components/postItem.vue";
import { useSessionStore } from "../stores/session";

const sessionStore = useSessionStore();

const caption = ref()
const img = ref(null)

let post = () => {
    return {
        author: sessionStore.session.value.user.id,
        caption: caption.value,
        image: img.value
    }
}

async function handleImage(event) {
    const data = await convertToBase64(event.target.files[0])
    img.value = data
}
</script>

<template>
    <div id="leftSide">
        <h2>Preview</h2>
        <PostItem :post="post()" />
    </div>
    <div id="rightSide">
        <input type="file" accept="image/*" ref="image" @change="handleImage">
        <textarea id="titleText" placeholder="Caption" v-model="caption"></textarea>
        <textarea id="postText" placeholder="What's happening?"></textarea>
    </div>
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

#rightSide {
    position: absolute;
    width: 50%;
    left: 50%;
}

#leftSide {
    position: absolute;
    width: 50%;
    left: 0;
    text-align: center;
}</style>