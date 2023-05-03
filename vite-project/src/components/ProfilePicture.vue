<script setup>
const props = defineProps({
  src: String,
})
</script>

<template>
    <img :src="props.src" @error="if (this.src != 'error.jpg') this.src = 'error.jpg';">
</template>

<style scoped>
img {
    border-radius: 50%;
}
</style>