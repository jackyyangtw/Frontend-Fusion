<template>
  <div class="input-control">
    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><slot /></label>
    <input
      class="
      bg-gray-50 border border-gray-300 text-slate-700 rounded-lg block p-2.5 
      focus:ring-primary-600 focus:border-primary-600 
      dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
      " 
      placeholder="name@company.com" 
      required=""
      v-if="controlType === 'input'"
      v-bind="$attrs"
      :value="value"
      @input="$emit('input', $event.target.value)">
    <textarea
      v-if="controlType === 'textarea'"
      rows="10"
      :value="value"
      @input="$emit('input', $event.target.value)"></textarea>
  </div>
</template>

<script>
export default {
  name: 'AppInputControl',
  props: {
    controlType: {
      type: String,
      default: 'input'
    },
    value: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.input-control {
  margin: 10px 0;
}

.input-control label {
  display: block;
  font-weight: bold;
}

.input-control input,
.input-control textarea {
  display: block;
  width: 100%;
  box-sizing: border-box;
  /* font: inherit; */
  /* border: 1px solid #ccc; */
  padding: 5px;
}

.input-control input:focus,
.input-control textarea:focus {
  /* background-color: #eee; */
  outline: none;
}
</style>


