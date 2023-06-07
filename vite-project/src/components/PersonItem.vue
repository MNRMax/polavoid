<script setup>
import ProfilePicture from "./ProfilePicture.vue"
import FollowButton from "./followButton.vue";
import { useSessionStore } from "../stores/session";

const sessionStore = useSessionStore();
const props = defineProps({
    user: Object
})
</script>

<template>
<div>
    <div v-if="props.user" id="card">
        <ProfilePicture id="pfp" :src="props.user.avatar_url"/>
        <div>
            <h2>{{ props.user.username }}</h2>
            <h3>{{ props.user.full_name }}</h3>
        </div>
        <FollowButton id="followButton" style="background-color: var(--button);" :followed-user="props.user.id"/>
    </div>
</div>
</template>

<style scoped>
#splitter{
  width:90%;
  color: aliceblue;
}

#card {
    position: relative;
    background-color: var(--background);
    padding: 2rem;
    display: flex;
    border: 2px var(--text) solid;
    border-radius: 10px;
    margin-bottom: 2rem;
}

h2 {
    margin: 0;
}

h3 {
    margin: 0;
}

#pfp {
    height: 4rem;
    margin-right: 3rem;
}
#followButton {
    position: absolute; 
    right: 10%;
    top: 50%;
    transform: translateY(-50%);
}

</style>