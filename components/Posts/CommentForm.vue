<template>
    <section>
        <h2 class="text-2xl font-bold text-slate-950 dark:text-white">評論</h2>
        <form @submit.prevent="addComment">
            <textarea v-model="comment"></textarea>
            <button type="submit">提交</button>
        </form>
    </section>
</template>

<script>
export default {
    props: {
        post: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            comment: ''
        }
    },
    computed: {
        user() {
            return this.$store.getters['user/userData']
        }
    },
    methods: {
        async addComment() {
            this.$store.dispatch('comments/addComment', {
                name: this.user.name,
                email: this.user.email,
                comment: this.comment,
                postId: this.post.id,
                // userId
            })
        }
    }
}
</script>