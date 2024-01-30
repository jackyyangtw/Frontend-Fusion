import Cookie from "js-cookie";
import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
const authStore = useAuthStore();

export const useUserStore = defineStore('user', {
    state: () => ({
        userData: null,
        userPosts: [],
        fetchedUSerCount: 0,
        fetchedUserPostsCount: 0,
    }),
    actions: {
        async setUserData(handler) {
            const userDataString = Cookie.get('userData');
            if (!userDataString) {
                this.userData = {};
                return;
            }
    
            const userData = JSON.parse(userDataString);
            const { data: dbUserData } = await this.$axios.get(`/users/${userData.id}.json`);
            const isManager = dbUserData?.isManager;
            this.userData = { ...userData, isManager };
            this.fetchedUSerCount++;
            if (!handler) return
            handler();
        },
        async setUserPosts(handler) {
            const userDataString = Cookie.get('userData');
            if (!userDataString) return;
    
            const userId = JSON.parse(userDataString)?.id;
            if (!userId) return;
    
            const userPosts = await this.$axios.$get(`/posts.json`);
            const filteredPosts = Object.values(userPosts).filter(post => post.userId === userId);
            this.userPosts = filteredPosts;
            this.fetchedUserPostsCount++;
            if (!handler) return
            handler();
        },
        async updateUserPhoto(photo) {
            const storageRef = this.$storage.ref();
            const { id: uid } = this.userData;
            const stickerRef = storageRef.child(`user-sticker/${uid}`);
            try {
                await stickerRef.put(photo);
                const token = authStore.token;
                const url = await stickerRef.getDownloadURL();
                const updatedData = { ...this.userData, photoURL: url };
                await this.$axios.$put(`/users/${uid}.json?auth=${token}`, updatedData);
                this.userData = updatedData;
                Cookie.set('userData', JSON.stringify(updatedData));
                return url;
            } catch (error) {
                console.error(error);
            }
        },
        async updateAllUserPostsPhoto(photoURL) {
            if (!photoURL || this.userPosts.length === 0) return;
            const promises = this.userPosts.map(post => {
                const updatedData = {
                    ...post,
                    photoURL: photoURL
                }
                return this.$axios.$put(`/posts/${post.id}.json?auth=${authStore.token}`, updatedData);
            });
            await Promise.all(promises);
            this.setUserPosts();
        }
    },
})