<script setup>
import { ref } from "vue"
import { supabase } from '../supabase'
import { useSessionStore } from '../stores/session'

const props = defineProps({
    followedUser: String,
})

const sessionStore = useSessionStore()
const userID = ref(sessionStore.session.value.user.id)

const following = ref(false)
const emit = defineEmits(['update'])

function getBGColor() {
    const color = `background-color: ${following.value ? "var(--box1)" : "var(--button)"};`
    return color
}
async function handleFollow() {
    if (following.value) {
        const { error } = await supabase
            .from('follows')
            .delete()
            .match({ user_id: sessionStore.session.value.user.id, following: props.followedUser })
    }
    else {
        const { error } = await supabase
            .from('follows')
            .insert({ user_id: sessionStore.session.value.user.id, created_at: new Date(), following: props.followedUser })
    }
    following.value = !following.value
    emit('update')
}
async function checkFollowing() {
    const { data, error } = await supabase
        .from('follows')
        .select()
        .match({ user_id: sessionStore.session.value.user.id, following: props.followedUser })
    data.length === 0 ? following.value = false : following.value = true
}
checkFollowing()
</script>

<template>
    <button v-if="props.followedUser !== sessionStore.session.value.user.id" :style="getBGColor()" @click="handleFollow">{{ following ? "Following" : "Follow" }}</button>
</template>

<style scoped>
#followButton {
    height: fit-content;
    box-shadow: none;
    font-size: 1.3rem;
    color: var(--text);
    border-style: none;
    margin-left: 5rem;
    border-radius: 0.3rem;
    padding: 0.2rem;
    padding-left: 1rem;
    padding-right: 1rem;
    width: fit-content;
    background-color: var(--button);
}
</style>