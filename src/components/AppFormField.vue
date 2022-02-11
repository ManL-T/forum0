<template>
  <div class="form-group">
    <label :for="name">{{label}}</label>
    <br>
    <VeeField
      :name="name"
      :label="label"
      :modelValue="modelValue"
      @input="$emit('modelUpdate', $event)"
      :id="name"
      class="form-input"
      v-bind="$attrs"
    />
    <br>
    <VeeErrorMessage :name="name" class="form-error" />
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  props: {
    name: { type: String, required: true },
    label: { type: String, default: '' },
    modelValue: { type: String, default: '' }
  }
}
</script>

<style>

.form-group {
  margin-left: 20%;
  padding: auto;
  align-content: center;
  align-items: center;
}

label {
  font-size: 1em;
  color: #064637;
  margin-top: 0.5em;
}

.form-input {
  font-size: 2em;
  width: 80%;
  border: none;
  border-radius: 5px;
  background-color: #9bc2ca;
  color: #031e27;
}


</style>