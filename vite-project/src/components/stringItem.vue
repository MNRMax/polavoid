<script setup>
import PostItem from "./postItem.vue";
import { useSessionStore } from "../stores/session";
import { supabase } from "../supabase";
import { ref } from "vue"

const post = ref(undefined);

async function getPost() {
  const { data, error } = await supabase.from("posts").select();
  // console.log(data)
  return data[0];
}
getPost().then((data) => {
  post.value = data;
  // console.log(data)
});
</script>

<template>
  <div id="all">
    <PostItem v-if="post" id="post1" :post="post"/>
    <PostItem v-if="post" id="post2" :post="post"/>
    <PostItem v-if="post" id="post3" :post="post"/>
  </div>
</template>

<style scoped>
#all  {
  /* position: relative; */
}
#post1 {
  position: absolute;
  left: 20vw;
  transform-origin: center;
  transform: rotateZ(180deg);
}
#post2 {
  position: absolute;
  left: 42.5vw;
  /* transform: translatex(-7.5vw) */
}
#post3 {
  position: absolute;
  right: 33vw;
}
</style>