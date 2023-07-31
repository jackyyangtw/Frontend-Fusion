<template>
    <div>
        <label
            for="countries"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >{{ label }}</label
        >

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
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            default: "排序方式",
        },
        defaultOption: {
            type: String,
            default: "請選擇",
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

