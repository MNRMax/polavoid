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
//https://stackoverflow.com/questions/39020670/rotate-objects-around-circle-using-css
//https://stackoverflow.com/questions/10152390/dynamically-arrange-some-elements-around-a-circle 


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
  position: relative;
}
#post1 {
  position: absolute;
  left: 10%;
}
#post2 {
  position: absolute;
  left: 40%;
  /* transform: translatex(-7.5vw) */
}
#post3 {
  position: absolute;
  right: 30%;
}
</style>

