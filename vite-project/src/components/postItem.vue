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
let oldOwner = props.post.author

async function getProfile() {
  const { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", props.post.author);
  profile.value = data[0];
}
async function handleLike(e) {
  e.stopPropagation();
  liked.value = !liked.value;
  if (liked.value) {
    const { data, error } = await supabase.rpc("like", {
      postid: props.post.id,
      userid: sessionStore.session.value.user.id,
      date: new Date(),
    });
    let tagData = [];
    props.post.tags.forEach((tagTxt) => {
      tagData.push({
        post_id: props.post.id,
        user_id: sessionStore.session.value.user.id,
        created_at: new Date(),
        tag_txt: tagTxt,
      });
    });
    const { dataOne, errorOne } = await supabase
      .from("tags_used")
      .upsert(tagData)
      .select();
  } else {
    const { data, error } = await supabase.rpc("unlike", {
      postid: props.post.id,
      userid: sessionStore.session.value.user.id,
    });
    const { dataOne, errorOne } = await supabase
      .from("tags_used")
      .delete()
      .match({
        post_id: props.post.id,
        user_id: sessionStore.session.value.user.id,
      });
  }
}
onMounted(() => {
  getProfile();
  setInterval(() => {
    if (props.post.author != oldOwner) {
        oldOwner = props.post.author
        getProfile()
    }
  }, 1000)
});
async function checkLike() {
  const { data, error } = await supabase.from("likes").select().match({
    user_id: sessionStore.session.value.user.id,
    post_id: props.post.id,
  });
  data.length === 0 ? (liked.value = false) : (liked.value = true);
}
checkLike();
function log() {
  console.log(props.post.author);
}
</script>

<template>
  <div>
    <div v-if="profile" id="post" @click="flipped = !flipped;log() ">
      <div id="inner" :class="flipped ? 'flipped' : ''">
        <img class="clip" src="/clip.png" />
        <div id="front">
          <img v-if="props.post.image" id="postImage" :src="props.post.image" />
          <img v-else id="postImage" src="/noupload.png" />
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
        <div id="back">
          <h2>{{ props.post.description }}</h2>
          <h2>{{ props.date }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.clip {
  width: 13vw;
  position: absolute;
  top: -7vw;
  z-index: 5;
  left: 0.5vw;
}
#like {
  position: absolute;
  top: 18vw;
  left: 9.5vw;
  width: 5vw;
  font-size: 2.2rem;
  color: var(--purple);
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
  transition: 0.7s;
}

#like:hover {
  color: var(--button);
  font-size: 2.5rem;
}

.liked {
  font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48;
  color: var(--button);
}

#post {
  width: 13vw;
  /* position: absolute;
  top: 32%;
  left: 40.5%; */
  transition: 1s;
}

/* #post:hover {
  width: 14vw;
} */
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
  -webkit-backface-visibility: hidden;
  /* Safari */
  backface-visibility: hidden;
  padding: 20px;
  transition: 0.5s;
}

#back {
  font-family: "Caveat", cursive;
  font-size: 10px;
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
  width: 11vw;
  height: 14.6vw;
}

#pfp {
  width: 4rem;
  height: 4rem;
  padding: 15px;
}

#bottom {
  margin: -23px;
  display: flex;
}

#user {
  display: flex;
  flex-direction: row;
  align-items: left;
}

#signature {
  color: rgb(28, 12, 59);

  font-family: "Caveat", cursive;
}

#caption {
  color: black;
  font-family: "Caveat", cursive;
}
</style>
