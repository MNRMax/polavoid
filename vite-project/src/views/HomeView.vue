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
      <img src="Blue-light-bulbs.png" alt="string lights" id="stringy" />
    </div>
    <div class="fyp">\
      <StringItem/>
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
