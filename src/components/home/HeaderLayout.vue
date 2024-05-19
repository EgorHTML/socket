<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item :index="tabsStore.tabNames.profile.tabName">Профиль</el-menu-item>
        <el-menu-item :index="tabsStore.tabNames.users.tabName">Пользователи</el-menu-item>
        <el-menu-item :index="tabsStore.tabNames.chats.tabName">Чаты</el-menu-item>
    </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useHomeTabs } from '../../store/Home/homeTabs.js'

const tabsStore = useHomeTabs()

const activeIndex = ref('profile')
const handleSelect = (key: string, keyPath: string[]) => {
    tabsStore.changeActiveTab(tabsStore.tabNames[key])
}
</script>