<script setup>
import ProfilePicture from "./ProfilePicture.vue";
import { supabase } from "../supabase";
import { ref, onMounted } from "vue";
import "../assets/main.css";

const props = defineProps({
  post: Object,
});

const profile = ref(undefined);
const flipped = ref(false);

async function getProfile() {
  console.log(props.post.author);
  const { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", props.post.author);
  profile.value = data[0];
}
// getProfile().then(data => {
//     profile.value = data;
// })
onMounted(() => {
  getProfile();
});
</script>

<template>
  <div v-if="profile" id="post" @click="flipped = !flipped">
    <div id="inner" :class="flipped? 'flipped': ''">
      <div id="front">
        <img v-if="props.post.image" id="postImage" :src="props.post.image">
        <img v-else id="postImage" src="noupload.png">
        <h2 id="caption">{{ props.post.caption }}</h2>
        <div id="bottom">
          <div id="user">
            <ProfilePicture id="pfp" :src="profile.avatar_url" />
            <h2 id="signature">{{ profile.username }}</h2>
          </div>
        </div>
      </div>
      <div id="back">
        <h2>h idsufdhasuhdfuhisu hifu hasui hfdih suaihfui hisdhiuaf hiusdhf uhaufh</h2>
      </div>
    </div>
  </div>
</template>

<style>
#post {
  /* perspective: 1000px; */
  width: 20%;
}
#front, #back {
  height: 54rem;
  position: absolute;
  margin: auto;
  width: 100%;
  background-color: aliceblue;
  box-shadow: 20px 20px 20px rgb(106, 45, 30);
  padding: 1.5rem 1.5rem 0.2rem 1.5rem;
  overflow-wrap: break-word;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}
#back {
  transform: rotateY(180deg);
}
.flipped {
  transform: rotateY(180deg);
}
#inner {
  position: relative;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  transform-origin: center center;
}
#postImage {
  width: 100%;
}

#pfp {
  width: 4rem;
  height: 4rem;
  padding: 10px;
}

#user {
  display: flex;
  flex-direction: row;
  align-items: center;
}

#signature {
  color: black;
  font-family: "Caveat", cursive;
}

#caption {
  color: black;
  font-family: "Caveat", cursive;
}
</style>
