<script setup>
import PostItem from "./postItem.vue";
import { useSessionStore } from "../stores/session";
import { supabase } from "../supabase";
import { createBlock, ref } from "vue";

const sessionStore = useSessionStore();

const post = ref(undefined);
const positions = ref([1, 2, 3, 4, 5, 6]);
const rotation = ref(0);

const leftArray = ref([])
const rightArray = ref([])
let cooldown = false
let loading = false
let fypType = "get_popular_posts"

async function getInitialPosts(alg) {
  const { data, error } = await supabase.rpc(alg, {
    userid: sessionStore.session.value.user.id,
    min_index: 0,
    max_index: 10,
  });
  return data;
}
getInitialPosts("get_popular_posts").then(async (ids) => {
    if (!ids || ids.length == 0 ) return
    const { data, error } = await supabase
        .from('posts')
        .select()
        .in('id', ids)
    post.value = [data[2], data[1], data[0], undefined, undefined, undefined];
    data.shift()
    data.shift()
    data.shift()
    data.forEach(item => {
        leftArray.value.unshift(item)
    })
});

async function getNewPosts() {
    getInitialPosts().then(async (ids) => {
    const { data, error } = await supabase
        .from('posts')
        .select()
        .in('id', ids)
    data.forEach(item => {
        leftArray.value.unshift(item)
    })
});
}

function calcID(num) {
  return "post" + positions.value[num - 1];
}
function getRotation() {
  return `transform: translateX(-50%) rotate(${rotation.value}deg);`;
}
function rotate(dir) {
  rotation.value += 25 * dir;
}
async function addToHistory(postID) {
  const { error } = await supabase.from("view_history").upsert({
    post_id: postID,
    user_id: sessionStore.session.value.user.id,
    created_at: new Date(),
  });
}

function handleLeftArrow() {
  if (post.value[positions.value.indexOf(2)] !== undefined && !cooldown) {
    cooldown = true;
    addToHistory(post.value[positions.value.indexOf(3)].id);
    setTimeout(() => {
      cooldown = false;
    }, 800);
    if (leftArray.value.length == 2) {
      getNewPosts();
    }
    let buffer = post.value[positions.value.indexOf(6)];
    rightArray.value.push(buffer);
    post.value[positions.value.indexOf(6)] = leftArray.value.pop();
    positions.value.push(positions.value.shift());
    rotate(-1);
  }
}
function handleRightArrow() {
  if (post.value[positions.value.indexOf(4)] !== undefined && !cooldown) {
    cooldown = true;
    addToHistory(post.value[positions.value.indexOf(3)].id);
    setTimeout(() => {
      cooldown = false;
    }, 800);
    positions.value.unshift(positions.value.pop());
    let buffer = post.value[positions.value.indexOf(6)];
    leftArray.value.push(buffer);
    post.value[positions.value.indexOf(6)] = rightArray.value.pop();
    rotate(1);
  }
}
function checkPossibleRight() {
  if (post.value) {
    return post.value[positions.value.indexOf(4)] == undefined
      ? "background-color: rgba(255, 255, 255, 0.35); cursor: not-allowed;"
      : "background-color: white;";
  }
  return "background-color: white;";
}
function checkPossibleLeft() {
  if (post.value) {
    return post.value[positions.value.indexOf(2)] == undefined
      ? "background-color: rgba(255, 255, 255, 0.35); cursor: not-allowed;"
      : "background-color: white;";
  }
  return "background-color: white;";
}
function load(value) {
    loading = value
}
function handleAlgorithmChange() {
    load(true)
    post.value = undefined;
    positions.value = [1, 2, 3, 4, 5, 6]
    rotation.value = 0
    
    leftArray.value = []
    rightArray.value = []
    cooldown = false
    fypType = document.getElementById("selectFyp").value
    getInitialPosts(fypType).then(async (ids) => {
        if (!ids || ids.length == 0) return
        const { data, error } = await supabase
        .from('posts')
        .select()
        .in('id', ids)
        post.value = [data[2], data[1], data[0], undefined, undefined, undefined];
        data.shift()
        data.shift()
        data.shift()
        data.forEach(item => {
            leftArray.value.unshift(item)
        })
    });
    load(false)
}
</script>

<template>
    <span id="arrow" class="material-symbols-outlined left" @click="handleLeftArrow()"
        :style="checkPossibleLeft()">arrow_back_ios_new</span>
    <span id="arrow" class="material-symbols-outlined right" @click="handleRightArrow()"
        :style="checkPossibleRight()">arrow_forward_ios</span>
    <div id="all" v-if="post">
        <PostItem v-if="post[0]" :id="calcID(1)" class="post" :post="post[0]" />
        <PostItem v-if="post[1]" :id="calcID(2)" class="post" :post="post[1]" />
        <PostItem v-if="post[2]" :id="calcID(3)" class="post" :post="post[2]" />
        <PostItem v-if="post[3]" :id="calcID(4)" class="post" :post="post[3]" />
        <PostItem v-if="post[4]" :id="calcID(5)" class="post" :post="post[4]" />
        <PostItem v-if="post[5]" :id="calcID(6)" class="post" :post="post[5]" />
    </div>
    <img src="\blueLightBulbs.png" alt="string lights" id="stringy" :style="getRotation()" />
    <select name="fypOption" id="selectFyp">
        <option value="get_popular_posts">Popular</option>
        <option value="fyp">For You</option>
      <option value="get_trending_posts">Trending</option>
    </select>
</template>

<style scoped>
#loading {
    position: absolute;
    width: 5vw;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
#selectFyp {
    position: absolute;
    padding: 0px 70px;
    min-height: 35px;
    font-size: 20px;
    left: 50%;
    bottom: 15vh;
    background-color: var(--button);
    color: white;
    border: solid var(--text) 1px;
    border-radius: 10px;
    transform: translateX(-50%);
}

.post {
  transition: 1s;
  position: absolute;
  transform-origin: top center;
  left: 43.5vw;
  top: 19vw;
}

#post1 {
  transform: rotateZ(33deg) translate(-65vw, 0vw);
}

#post2 {
  transform: rotateZ(33deg) translate(-30vw, 8.5vw);
}

#post3 {
  /* no movement */
}

#post4 {
  transform: rotateZ(-33deg) translate(30vw, 8.5vw);
}

#post5 {
  transform: rotateZ(-33deg) translate(65vw, 0vw);
}

#post6 {
  transform: translate(0vw, -65vw);
}

#stringy {
  position: absolute;
  z-index: -1;
  width: 130vw;
  left: 50%;
  top: -100vw;
  transition: 1s;
  transform-origin: center;
  transform: translateX(-50%);
}

#arrow {
  cursor: pointer;
  color: rgb(0, 0, 0);
  font-variation-settings: "FILL" 1, "wght" 800, "GRAD" 0, "opsz" 48;
  background-color: white;
  padding: 0.5rem;
  border-radius: 50%;
  z-index: 10;
  top: 70vh;
  transition: 0.5s;
  position: absolute;
  transform-origin: top center;
}

.left {
  left: 37vw;
}

.right {
    right: 37vw;
}</style>
