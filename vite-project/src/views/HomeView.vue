<script setup>
import { ref } from "vue";
import WelcomeItem from "../components/WelcomeItem.vue";
import PostItem from "../components/postItem.vue";
import { useSessionStore } from "../stores/session";
import { supabase } from "../supabase";

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
      <h1>Picture Prose</h1>
      <img src="String-lights.png" alt="string lights" id="stringy" />
    </div>

    <PostItem v-if="post" :post="post" />
  </main>
</template>

<style>
h1 {
  font-size: 60px;
  text-align: center;
  color: var(--border);
  background-color: var(--golden);
  border-radius: 10px;
  width: 500px;
  border: solid var(--border) 4px;
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

#loginLink {
  background-color: var(--golden);
  border-radius: 10px;
  border: solid var(--border) 4px;
  margin: 200px;
}
#registerLink {
  background-color: var(--golden);
  border-radius: 10px;
  border: solid var(--border) 4px;
  margin: 200px;
}
</style>

<style scoped>
body {
  color: var(--text);
  background: linear-gradient(0deg, #2f1616 0%, #905d23 100%);
}
</style>
