<script setup>
import { ref } from 'vue';
import request from '../api/request';

request('/api/user', {
    method: 'GET',
})
    .then(async data => {
        const response = await data.json()
        email.value = response.data.email
    })
    .catch(error => {
        console.warn(error);
    })

const email = ref('')
</script>

<template>
    <div>
        EMAIL: {{ email }} <br>
        <RouterLink to="/login">Go to Auth</RouterLink>
    </div>
</template>