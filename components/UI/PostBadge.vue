<template>
    <span :class="[`badge-style`,classes]">{{ badgeName }}</span>
</template>

<script>
    export default {
        props: {
            classes: {
                type: String,
                required: false,
                default: ''
            },
            badgeName: {
                type: String,
                required: true
            }
        }
    }
</script>

<style scoped>
.badge-style {
    @apply text-xs font-medium mr-2 px-2.5 py-0.5 rounded;
}

</style>