<template>
    <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="Регистрация" name="register">
            <LoginForm :is-login="isLogin" />
        </el-tab-pane>
        <el-tab-pane label="Авторизация" name="login">
            <LoginForm :is-login="isLogin" />
        </el-tab-pane>
    </el-tabs>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'

import LoginForm from '../components/LoginForm.vue'

const activeName = ref('register')

const isLogin = computed(() => activeName.value === 'login')
</script>
<style>


.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

.demo-tabs {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 80%;
    justify-content: center;
}
</style>