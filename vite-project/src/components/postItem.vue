<script setup>
import ProfilePicture from "./ProfilePicture.vue";
import { supabase } from "../supabase";
import { ref, onMounted } from "vue";
import "../assets/main.css";
import { useSessionStore } from "../stores/session";

const sessionStore = useSessionStore();
const userID = ref(sessionStore.session.value.user.id);

const props = defineProps({
  post: Object,
});

const profile = ref(undefined);
const flipped = ref(false);
const liked = ref(false);

async function getProfile() {
  console.log(props.post.author);
  const { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", props.post.author);
  profile.value = data[0];
}
async function handleLike(e) {
  e.stopPropagation();
  if (liked.value) {
    const { error } = await supabase
      .from("likes")
      .delete()
      .match({ user_id: sessionStore.session.value.user.id, post_id: props.post.id })
  }
  else {
    const { error } = await supabase
      .from("likes")
      .insert({
        user_id: sessionStore.session.value.user.id,
        created_at: new Date(),
        post_id: props.post.id,
      });
  }
  liked.value = !liked.value;
}
onMounted(() => {
  getProfile();
});
async function checkLike() {
  const { data, error } = await supabase.from("likes").select();
  // .match({ user_id: sessionStore.session.value.user.id, post_id: props.post.id })
  data.length === 0 ? (liked.value = false) : (liked.value = true);
}
checkLike();
</script>

<template>
  <div>
    <div v-if="profile" id="post" @click="flipped = !flipped">
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
            <span
              id="like"
              :class="liked ? 'liked' : ''"
              @click="(e) => handleLike(e)"
              >favorite</span
            >
          </div>
        </div>
      </div>
      <div id="back">
        <h2>{{ props.post.description }}</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>
#like {
  position: absolute;
  top: 18vw;
  left: 9vw;
  width: 5vw;
  font-size: 2.2rem;
  color: red;
  font-family: "Material Symbols Outlined";
  font-weight: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: "liga";
  -webkit-font-smoodata: antialiased;
  cursor: pointer;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.liked {
  font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48;
}

#post {
  width: 13vw;
  position: absolute;
  top: 32%;
  left: 40.5%;
}
#front,
#back {
  /* height: 29rem; */
  height: 21vw;
  position: absolute;
  margin: auto;
  width: 100%;
  background-color: aliceblue;
  box-shadow: 20px 20px 20px rgba(67, 35, 27, 0.379);
  overflow-wrap: break-word;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
  padding: 20px;
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
  padding: 15px;
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
