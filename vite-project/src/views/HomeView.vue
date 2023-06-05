<script setup>
import { ref } from "vue";
import WelcomeItem from "../components/WelcomeItem.vue";
import PostItem from "../components/postItem.vue";
import StringItem from "../components/stringItem.vue";
import { useSessionStore } from "../stores/session";
import { supabase } from "../supabase";
import { RouterLink } from "vue-router";

const sessionStore = useSessionStore();
const post = ref(undefined);
const viewingHistory = undefined;

async function getPost() {
    const { data, error } = await supabase.from("posts").select();
    return data[0];
}
getPost().then((data) => {
    post.value = data;
    // console.log(data);
});
</script>

<template>
  <main class="introPage">
    <a
      v-if="sessionStore.session.value"
      :href="`/profile/${sessionStore.session.value.user.id}`"
      >Account</a
    >
    <a v-if="sessionStore.session.value" href="/people">People</a>
    <a v-if="sessionStore.session.value" href="/post">Create Post</a>
    <div class="loginRegister" v-else>
      <a id="loginLink" href="/login">Log In</a>
      <a id="registerLink" href="/register">Register</a>
    </div>

    <!-- <WelcomeItem /> -->
    <div class="intro">
      <h1>Polavoid</h1>
      <img src="Blue-light-bulbs.png" alt="string lights" id="stringy" />
    </div>
    <div class="fyp">
      <StringItem />
      <!-- <PostItem v-if="post" :post="post" /> -->
    </div>
  </main>
</template>

<style>
.fyp {
  display: flex;
  width: 100%;
  justify-content: space-around;
}

h1 {
  font-size: 60px;
  text-align: center;
  color: var(--text);
  background-color: var(--box1);
  border-radius: 10px;
  width: 400px;
  border: solid var(--text) 5px;
  margin: auto;
}

.intro {
  height: 400px;
}

#stringy {
  z-index: -1;
  width: 130%;
  position: absolute;
  left: -12.5%;
  top: -190vh;
}

.loginRegister {
  z-index: 4;
  text-align: center;
  margin: 30px;
  font-size: 30px;
}

#loginLink,
#registerLink {
  background-color: var(--button);
  border-radius: 10px;
  border: 3px solid var(--text);
  margin: 200px;
  padding: 5px;
}
</style>
