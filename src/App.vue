<script setup>
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

console.log(router, 'router');
console.log(route, 'route');
</script>

<template>
    <RouterView />
</template>

<style>
html,
#app,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
