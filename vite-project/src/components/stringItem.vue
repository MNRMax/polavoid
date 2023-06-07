<script setup>
import PostItem from "./postItem.vue";
import { useSessionStore } from "../stores/session";
import { supabase } from "../supabase";
import { createBlock, ref } from "vue";

const post = ref(undefined);
const positions = ref([1, 2, 3, 4, 5, 6])
const rotation = ref(0)

async function getPost() {
  const { data, error } = await supabase.from("posts").select();
  return data;
}
getPost().then((data) => {
  post.value = data;
  console.log(data);
});
function calcID(num) {
  return "post" + positions.value[num - 1]
}
function getRotation() {
  return `transform: translateX(-50%) rotate(${rotation.value}deg);`
}
function rotate(dir) {
  rotation.value += 25 * dir
}
</script>

<template>
  <span id="arrow" class="material-symbols-outlined left" @click="positions.push(positions.shift());; rotate(-1)">arrow_back_ios_new</span>
  <span id="arrow" class="material-symbols-outlined right" @click="positions.unshift(positions.pop());; rotate(1)">arrow_forward_ios</span>
  <div id="all">
    <PostItem v-if="post" :id="calcID(1)" class="post" :post="post[0]" />
    <PostItem v-if="post" :id="calcID(2)" class="post" :post="post[1]" />
    <PostItem v-if="post" :id="calcID(3)" class="post" :post="post[2]" />
    <PostItem v-if="post" :id="calcID(4)" class="post" :post="post[3]" />
    <PostItem v-if="post" :id="calcID(5)" class="post" :post="post[4]" />
    <PostItem v-if="post" :id="calcID(6)" class="post" :post="post[5]" />
  </div>
  <img src="blue-light-bulbs.png" alt="string lights" id="stringy" :style="getRotation()" />
</template>

<style scoped>
#all {
  /* position: relative; */
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
  ;
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
  transition: 1s;
  position: absolute;
  transform-origin: top center;
}
.left {
  left: 37vw;
}
.right {
  right: 37vw;
}
</style>
