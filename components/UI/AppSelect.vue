<template>
    <div>
        <label
            v-if="label"
            class="block text-sm font-medium text-gray-900 dark:text-white"
            >{{ label }}</label
        >
        <div class="flex items-center">
            <svg
                class="w-6 h-6 text-gray-800 dark:text-white mr-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 16"
            >
                <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5 5 1 1 5m0 6 4 4 4-4"
                />
            </svg>
            <select
                v-model="selectedOption"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                <option selected value="">{{ defaultOption }}</option>
                <option
                    v-for="option in options"
                    :key="option.value"
                    :value="option.value"
                >
                    {{ option.name }}
                </option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            default: "",
        },
        defaultOption: {
            type: String,
            default: "排序方式",
        },
        options: {
            type: Array,
            default: () => [],
        },
        value: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            selectedOption: this.value,
        };
    },
    watch: {
        selectedOption(newValue) {
            this.$emit("select", newValue);
        },
    },
};
</script>

