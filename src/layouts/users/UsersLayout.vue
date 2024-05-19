<template>
    <div>
        <ul>
            <li v-for="user in users" :key="user.email" style="margin-bottom: 20px;">
                <span style="margin-right: 50px;">name: {{ user.name }} </span>
                <span>email: {{ user.email }}</span>
            </li>
        </ul>
    </div>
</template>

<script setup>
import request from '../../api/request.js'
import { ref } from 'vue'

const users = ref()

request('/api/users').then(async data => console.log(await data.json(), 'users'))

getUsers().then(data => {
    users.value = data
})

async function getUsers() {
    return [{
        email: 'test@gmail.com',
        name: 'test'
    }, {
        email: 'test@gmail.com',
        name: 'test'
    }, {
        email: 'test@gmail.com',
        name: 'test'
    }, {
        email: 'test@gmail.com',
        name: 'test'
    }, {
        email: 'test@gmail.com',
        name: 'test'
    }, {
        email: 'test@gmail.com',
        name: 'test'
    },]
}
</script>