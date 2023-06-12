<template>
    <section>
        <div v-for="comment in comments" :key="comment.id">
            <div>{{ comment.author }} <span>{{ comment.date }}</span></div>
            <div>{{ comment.text }}</div>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        comments: {
            type: Array,
            required: true
        }
    }
}
</script>