<script setup>
import { ref } from 'vue';
import request from '../api/request';
console.log(2);
request('/api/user', {
    method: 'GET',
}).then(async data => {
    const response = await data.json()
    console.log(response,'response');
    email.value = response.data.email
})

const email = ref('')
</script>

<template>
    <div>
        EMAIL: {{ email }} <br>
        <RouterLink to="/login">Go to Auth</RouterLink>
    </div>

</template>