<script setup>
import PostItem from "./postItem.vue";
import { useSessionStore } from "../stores/session";
import { supabase } from "../supabase";
import { ref } from "vue"

const post = ref(undefined);

async function getPost() {
  const { data, error } = await supabase.from("posts").select();
  // console.log(data)
  return data;
}
getPost().then((data) => {
  post.value = data;
  console.log(data)
});

var radius = 100;
var fields = $('.post'),
  container = $('#all'),
  width = container.width(),
  height = container.height();
var angle = 0,
  step = (2 * Math.PI) / fields.length;
fields.each(function() {
  var x = Math.round(width / 2 + radius * Math.cos(angle) - $(this).width() / 2);
  var y = Math.round(height / 2 + radius * Math.sin(angle) - $(this).height() / 2);
  if (window.console) {
    console.log($(this).text(), x, y);
  }
  $(this).css({
    left: x + 'px',
    top: y + 'px'
  });
  angle += step;
});
//https://stackoverflow.com/questions/39020670/rotate-objects-around-circle-using-css
//https://stackoverflow.com/questions/10152390/dynamically-arrange-some-elements-around-a-circle 


</script>

<template>
  <div id="all">
    <PostItem v-if="post" class="post" id="post1" :post="post[0]"/>
    <PostItem v-if="post" class="post" id="post2" :post="post[1]"/>
    <PostItem v-if="post" class="post" id="post3" :post="post[2]"/>
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

