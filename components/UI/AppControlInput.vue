<template>
    <div class="input-control">
        <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            ><slot
        /></label>
        <input
            class="w-full bg-gray-50 border border-gray-300 text-slate-700 rounded-lg block p-2.5 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            :placeholder="placeholder"
            required=""
            v-if="controlType === 'input'"
            v-bind="$attrs"
            :value="value"
            @input="$emit('input', $event.target.value)"
        />
        <textarea
            v-if="controlType === 'textarea'"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            rows="10"
            :value="value"
            @input="$emit('input', $event.target.value)"
        >
        </textarea>
    </div>
</template>

<script>
export default {
    name: "AppInputControl",
    props: {
        controlType: {
            type: String,
            default: "input",
        },
        value: {
            type: String,
            default: "",
        },
        hasError: {
            type: Boolean,
            default: false,
        },
        placeholder: {
            type: String,
            default: "",
        },
    },
};
</script>

<style scoped>
.input-control {
    margin: 10px 0;
}

.input-control label {
    display: block;
    font-weight: bold;
}

.input-control input:focus,
.input-control textarea:focus {
    outline: none;
}
</style>


