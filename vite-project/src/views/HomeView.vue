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
});
</script>

<template>
  <main>
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
    <PostItem v-if="post" :post="post" />
  </main>
</template>

<style>
.loginRegister {
  text-align: center;
  margin: auto;
  font-size: 40px;
}
#loginLink {
  margin: 50px;
}
#registerLink {
  margin: 50px;
}
</style>
