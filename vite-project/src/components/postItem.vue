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
  <div v-if="profile" id="post1" @click="flipped = !flipped">
    <div id="inner" :class="flipped ? 'flipped' : ''">
      <div id="front">
        <img v-if="props.post.image" id="postImage" :src="props.post.image" />
        <img v-else id="postImage" src="noupload.png" />
        <h3 id="caption">{{ props.post.caption }}</h3>
        <div id="bottom">
          <div id="user">
            <ProfilePicture id="pfp" :src="profile.avatar_url" />
            <h3 id="signature">{{ profile.username }}</h3>
          </div>
        </div>
      </div>
      <div id="back">
        <h2>{{ props.post.caption }}</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>
#post1 {
  width: 13%;
  position: absolute;
  top: 30%;
  left: 40.5%;
}
#front,
#back {
  height: 29rem;
  position: absolute;
  margin: auto;
  width: 100%;
  background-color: aliceblue;
  box-shadow: 20px 20px 20px rgba(67, 35, 27, 0.379);
  overflow-wrap: break-word;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
  padding: 20px 20px 20px 20px;
}
#back {
  color: black;
  transform: rotateY(180deg);
}
.flipped {
  transform: rotateY(180deg);
}
#inner {
  display: flex;
  position: relative;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}
#postImage {
  width: 100%;
}
#pfp {
  width: 4rem;
  height: 4rem;
  padding: 10px;
}
#bottom {
  margin: -23px;
}
#user {
  display: flex;
  flex-direction: row;
  align-items: left;
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
