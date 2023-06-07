<script setup>
import FollowButton from "./followButton.vue";
import ProfilePicture from "./ProfilePicture.vue";

const props = defineProps({
  profile: Object,
});
</script>

<template>
  <div id="all">
    <ProfilePicture id="pfp" :src="props.profile.avatar_url" />
    <div id="text">
      <h2>{{ props.profile.username }}</h2>
      <h3>{{ props.profile.full_name }}</h3>
    </div>
    <FollowButton
      @update="getAllData"
      id="followButton"
      :followedUser="profile.id"
    />
  </div>
</template>

<style scoped>
#pfp {
  height: 4rem;
  width: 4rem;
}
#text {
  width: fit-content;
}
#all {
  width: 90%;
  display: flex;
  padding: 2rem;
  color: aliceblue;
}

h2 {
  font-size: 1.5rem;
  margin: 0;
  margin-top: 0.5rem;
  margin-left: 4rem;
}
h3 {
  width: fit-content;
  font-family: "Caveat", cursive;
  font-size: 1.5rem;
  margin: 0;
  margin-left: 4rem;
}
button {
  position: fixed;
  margin-top: 1.25rem;
  height: fit-content;
  box-shadow: none;
  font-size: 1.3rem;
  color: var(--button);
  border-style: none;
  right: 60px;
  border-radius: 0.3rem;
  padding: 0.2rem;
  padding-left: 1rem;
  padding-right: 1rem;
  width: fit-content;
}

button:hover {
  cursor: pointer;
}
</style>
