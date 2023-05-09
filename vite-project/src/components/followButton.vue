<script setup>
import { ref } from "vue"
import { supabase } from '../supabase'
import { useSessionStore } from '../stores/session'

const props = defineProps({
    id: String,
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
    const { data, error } = await supabase
        .from('profiles')
        .update({ following: arrayAppend('new_element') })
        .match({ id: userID });
    emit('update')
}
</script>

<template>
    <button :style="getBGColor()" @click="handleFollow">{{ following ? "Following" : "Follow" }}</button>
</template>

<style scoped></style>