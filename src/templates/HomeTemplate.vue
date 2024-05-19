<script setup>
import HeaderLayout from '../components/home/HeaderLayout.vue'
import { useHomeTabs } from '../store/Home/homeTabs';

import { ref } from 'vue'

const tabStore = useHomeTabs()
const activeTab = ref(tabStore.activeTab)

tabStore.$subscribe((mutation, state) => {
    activeTab.value = state.activeTab
})
</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <HeaderLayout />
            </el-header>
            <el-container>
                <el-aside width="200px">Aside</el-aside>
                <el-main>
                    <component :is="activeTab.component"></component>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>