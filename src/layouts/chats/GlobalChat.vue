<template>
    <div class="chat" style="width: 500px; height: 800px; background-color:blueviolet; padding: 10px;">
        <div class="messages" style="display: flex; flex-direction: column; flex:  1 1; height: 80%;">
            <div v-for="message in messages" class="message"
                style="border: 1px solid #000; margin-bottom: 5px; width: 400px"
                :style="{ 'align-self': userName === message.userName ? 'flex-end' : '' }">
                <div>
                    <h1> {{ message.userName }} </h1>
                    <p> {{ message.textMessage }} </p>
                </div>
            </div>
        </div>

        <div>
            <textarea v-model="textMessage" name="" id=""></textarea>
            <button @click="send">отправить</button>
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { io } from "socket.io-client";

const messages = ref([])
const textMessage = ref()

const userName = ref()

const socket = io();

socket.on('chat message', (msg) => {
    messages.value.push(msg)
});

watchEffect(() => {
    fetch('api/user').then(async data => userName.value = (await data.json()).data.email)
})

function send() {
    socket.emit('chat', {
        userName: userName.value,
        textMessage: textMessage.value
    });
}

</script>