<script setup>
import PostItem from "./postItem.vue";
import { useSessionStore } from "../stores/session";
import { supabase } from "../supabase";
import { ref } from "vue";

const post = ref(undefined);

async function getPost() {
  const { data, error } = await supabase.from("posts").select();
  // console.log(data)
  return data;
}
getPost().then((data) => {
  post.value = data;
  console.log(data);
});



</script>

<template>
  <div id="all">
    <PostItem v-if="post" class="post" id="post1" :post="post[0]" />
    <PostItem v-if="post" class="post" id="post2" :post="post[1]" />
    <PostItem v-if="post" class="post" id="post3" :post="post[2]" />
  </div>
</template>

<style scoped>
#all  {
  /*position: relative;*/
}
#post1 {
  position: absolute;
  top: 20vw;
  left: 20vw;
  /* transform-origin: center;
  transform: rotateZ(180deg); */
}
#post2 {
  position: absolute;
  top: 25vw;
  left: 42.5vw;
  /* transform: translatex(-7.5vw) */
}
#post3 {
  top: 20vw;
  position: absolute;
  right: 33vw;
}
</style>
