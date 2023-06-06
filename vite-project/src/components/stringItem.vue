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
function rotate() {
  rotation.value += 25
}
</script>

<template>
  <button @click="positions.unshift(positions.pop());; rotate()"> random button</button>
  <div id="all">
    <PostItem v-if="post" :id="calcID(1)" class="post" :post="post[0]" />
    <PostItem v-if="post" :id="calcID(2)" class="post" :post="post[1]" />
    <PostItem v-if="post" :id="calcID(3)" class="post" :post="post[2]" />
    <PostItem v-if="post" :id="calcID(4)" class="post" :post="post[0]" />
    <PostItem v-if="post" :id="calcID(5)" class="post" :post="post[1]" />
    <PostItem v-if="post" :id="calcID(6)" class="post" :post="post[2]" />
  </div>
  <img src="Blue-light-bulbs.png" alt="string lights" id="stringy" :style="getRotation()" />
</template>

<style scoped>
#all {
  /* position: relative; */
}

.post {
  transition: 1s;
  position: absolute;
  transform-origin: top center;
  left: 42.5vw;
  top: 16vw;
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
</style>
