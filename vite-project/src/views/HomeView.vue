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

// async function getPopular() {
//   const { data, error } = await supabase.rpc("getPopularPost", {
//     userid: sessionStore.session.value.user.id,
//   });
//   return data;
// }
// async function getPost() {
//   const { data, error } = await supabase
//     .from("posts")
//     .select()
//     .eq("id", await getPopular());
//   return data[0];
// }
// getPost().then((data) => {
//   post.value = data;
//   // console.log(data);
// });
</script>

<template>
  <main class="introPage">
    <!-- <WelcomeItem /> -->
    <div class="intro">
      <h1>Polavoid</h1>
    </div>
    <div class="fyp">
      <StringItem />
      <!-- <PostItem v-if="post" :post="post" /> -->
    </div>
  </main>
</template>

<style scoped>
option {
  margin: auto;
}
option:hover {
  cursor: pointer;
}
a {
  overflow-y: hidden;
}
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
  border: solid var(--text) 4px;
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
  top: -180vh;
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
