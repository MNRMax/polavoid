<script setup>
import { ref } from "vue";
import PersonItem from "../components/PersonItem.vue";
import { supabase } from "../supabase";
import router from '../router'

const users = ref(null);

function redirect(id) {
  window.location.pathname = ("/profile/" + id)
}

async function getAllUsers() {
  const { data, error } = await supabase.from("profiles").select();
  users.value = data;
  console.log(data);
}

getAllUsers();
</script>

<template>
  <div id="pplArr">
    <PersonItem id="item"
      v-if="users"
      v-for="user in users"
      :user="user"
      @click="redirect(user.id)"
    />
  </div>
</template>

<style>
#pplArr {
  overflow-y: scroll;
  height: 80vh;
}
#pplArr::-webkit-scrollbar {
  display: none;
}
#item {
 cursor: pointer;
}
</style>
