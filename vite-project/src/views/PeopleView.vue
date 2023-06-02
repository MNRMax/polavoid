<script setup>
import { ref } from "vue";
import PersonItem from "../components/PersonItem.vue";
import { supabase } from "../supabase";

const users = ref(null);

function redirect(id) {
  window.location = "/profile/" + id;
}

async function getAllUsers() {
  const { data, error } = await supabase.from("profiles").select();
  users.value = data;
  console.log(data);
}

getAllUsers();
</script>

<template>
  <div id="userList">
    <PersonItem
      v-if="users"
      v-for="user in users"
      :user="user"
      @click="redirect(user.id)"
    />
  </div>
</template>

<style scoped>
#userList {
  position: relative;
  overflow: auto;
}
</style>
