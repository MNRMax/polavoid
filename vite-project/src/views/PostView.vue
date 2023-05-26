<script setup>
import { ref } from "vue"
import convertToBase64 from "../base64"
import PostItem from "../components/postItem.vue";
import { useSessionStore } from "../stores/session";
import { supabase } from "../supabase";

const sessionStore = useSessionStore();

const caption = ref()
const description = ref()
const img = ref(null)   
const tags = ref()   

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
async function handlePost() {
    try {
        const post = {
            author: sessionStore.session.value.user.id,
            caption: caption.value,
            description: description.value,
            tags: tags.value.split(" "),
            image: img.value,
            created_at: new Date(),
        }
        const { error } = await supabase.from('posts').insert(post)
        if (error) throw error
        window.location = `/profile/${sessionStore.session.value.user.id}`
    } catch (error) {
        console.log(error)
    }
}
</script>

<template>
    <form @submit.prevent="handlePost">
        <div id="leftSide">
            <h2>Preview</h2>
            <PostItem :post="post()" />
        </div>
        <div id="rightSide">
            <input type="file" accept="image/*" ref="image" @change="handleImage" required>
            <textarea id="titleText" placeholder="Caption" v-model="caption" maxlength="50" pattern="[a-zA-Z0-9]+" rows="1" required></textarea>
            <textarea id="postText" placeholder="What's happening?" v-model="description" rows="3" required></textarea>
            <textarea id="tagsText" placeholder="Tags (Space Sepereated)" v-model="tags" rows="1" required></textarea>
        </div>
        <button id="postButton">Post</button>
    </form>
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

#postButton {
    font-size: 2rem;
    height: 2.5rem;
    width: fit-content;
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
}

#postButton:hover {
    cursor: pointer;
}

#titleText {
    font-size: 1.7rem;
    width: 90%;
}
#tagsText {
    font-size: 1.7rem;
    width: 90%;
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
}
</style>