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
    <div class="post">
      <div class="post-front">
        <img v-if="props.post.image" id="postImage" :src="props.post.image" />
        <img v-else id="postImage" src="noupload.png" />
        <h1 id="caption">{{ props.post.caption }}</h1>
        <div id="user">
          <ProfilePicture id="pfp" :src="profile.avatar_url" />
          <h2 id="signature">{{ profile.username }}</h2>
        </div>
      </div>

      <div class="post-back"><h1>description bah blah</h1></div>
    </div>
  </div>
</template>

<style scoped>
.post {
  margin: auto;
  width: 40%;
  box-shadow: 20px 20px 20px rgb(106, 45, 30);
  padding: 1.5rem 1.5rem 0.2rem 1.5rem;
  background-color: aliceblue;
  perspective: 1000px;
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
