import { defineStore } from 'pinia'
import { ref, markRaw, computed } from 'vue'
import UsersLayout from '../../layouts/users/UsersLayout.vue'
import ChatsLayout from '../../layouts/chats/ChatsLayout.vue'
import ProfileLayout from '../../layouts/profile/ProfileLayout.vue'

export const useHomeTabs = defineStore('HomeTabs', () => {
    const tabNames = computed(() => {
        return {
            profile: {
                tabName: 'profile',
                component: markRaw(ProfileLayout)
            },
            users: {
                tabName: 'users',
                component: markRaw(UsersLayout)
            },
            chats: {
                tabName: 'chats',
                component: markRaw(ChatsLayout)
            }
        }
    })

    const activeTab = ref(tabNames.value.profile)

    function changeActiveTab(tab) {
        if (!Object.values(tabNames.value).map(e => e.tabName).includes(tab.tabName))
            throw new Error('There is no such tab name.')

        activeTab.value = tab
    }
    return {
        tabNames, activeTab, changeActiveTab
    }
})