<script setup>
import { ref } from "vue";
import WelcomeItem from "../components/WelcomeItem.vue";
import PostItem from "../components/postItem.vue";
import { useSessionStore } from "../stores/session";
import { supabase } from "../supabase";
import { RouterLink } from "vue-router";

const sessionStore = useSessionStore();
const post = ref(undefined);

async function getPost() {
  const { data, error } = await supabase.from("posts").select();
  return data[0];
}
getPost().then((data) => {
  post.value = data;
  console.log(data);
});
</script>

<template>
  <main class="introPage">
    <RouterLink
      v-if="sessionStore.session.value"
      :to="`/profile/${sessionStore.session.value.user.id}`"
      >Account</RouterLink
    >
    <div class="loginRegister" v-else>
      <RouterLink id="loginLink" to="/login">Log In</RouterLink>
      <RouterLink id="registerLink" to="/register">Register</RouterLink>
    </div>

    <!-- <WelcomeItem /> -->
    <div class="intro">
      <h1>Polavoid</h1>
      <img src="String-lights.png" alt="string lights" id="stringy" />
    </div>
    <div class="fyp">
      <PostItem v-if="post" :post="post" />
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
  width: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
}
.loginRegister {
  z-index: 4;
  text-align: center;
  margin: 30px;
  font-size: 40px;
}

#loginLink,
#registerLink {
  background-color: var(--button);
  border-radius: 10px;
  border: solid var(--border) 4px;
  margin: 200px;
}
</style>
