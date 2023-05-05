<script setup>
const props = defineProps({
  src: String,
})
</script>

<template>
    <img v-if="props.src" :src="props.src">
    <img v-else src="/nopfp.png">
</template>

<style scoped>
img {
    border-radius: 50%;
}
</style>