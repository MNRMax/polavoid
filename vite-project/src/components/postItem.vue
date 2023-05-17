<script setup>
import ProfilePicture from "./ProfilePicture.vue";
import { supabase } from "../supabase";
import { ref, onMounted } from "vue";
import "../assets/main.css";

const props = defineProps({
  post: Object,
});

const profile = ref(undefined);

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
  <div v-if="profile" id="post">
    <!-- Div with everything in it -->
    <div class="post-inner">
      <!-- Inside of the card -->
      <div class="post-front">
        <!-- The front of the card -->
        <img v-if="props.post.image" id="postImage" :src="props.post.image" />
        <img v-else id="postImage" src="noupload.png" />
        <!-- Image -->
        <h1 id="caption">{{ props.post.caption }}</h1>
        <!-- caption -->
        <div id="user">
          <!-- Personal info (pfp, username) -->
          <ProfilePicture id="pfp" :src="profile.avatar_url" />
          <h2 id="signature">{{ profile.username }}</h2>
        </div>
      </div>
      <div class="post-back"><h1>description bah blah</h1></div>
    </div>
  </div>
</template>

<style scoped>
.post-front {
  /*front of the card*/
  border: 1px solid #f1f1f1;
  perspective: 1000px;
}
.post-inner {
  margin: auto;
  width: 40%;
  box-shadow: 20px 20px 20px rgb(106, 45, 30);
  padding: 1.5rem 1.5rem 0.2rem 1.5rem;
  background-color: seashell;
  perspective: 1000px;
  position: relative;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}
.post-front:hover .post-inner {
  transform: rotateY(180deg);
}
.post-front,
.post-back {
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
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
