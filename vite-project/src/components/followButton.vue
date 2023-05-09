<script setup>
import { ref } from "vue"
import { supabase } from '../supabase'
import { useSessionStore } from '../stores/session'

const props = defineProps({
    thing: String,
})

const sessionStore = useSessionStore()
const userID = ref(sessionStore.session.value.user.id)

const following = ref(true)
const emit = defineEmits(['update'])

function getBGColor() {
    const color = `background-color: ${following.value ? "gray" : "#00bd7e"};`
    return color
}
async function handleFollow() {
    following.value = !following.value
    if (following.value) {
    }
    else {
        const { error } = await supabase
            .from('follows')
            .insert({ user: sessionStore.session.value.user.id, created_at: new Date(), following: props.thing })
    }
    emit('update')
}
</script>

<template>
    <button :style="getBGColor()" @click="handleFollow">{{ following ? "Following" : "Follow" }}</button>
</template>

<style scoped></style>