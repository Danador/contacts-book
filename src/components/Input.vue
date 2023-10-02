<template>
    <label class="field" :for="id">
        <input
            class="field__input"
            :id="id"
            :name="name"
            :type="type"
            :required="required"
            :disabled="disabled"
            :placeholder="placeholder"
            :maxlength="type === 'tel' ? 17 : maxlength"
            :minlength="minlength"
            v-model="model"
            @input="[
                type === 'tel' ? maskFn : '',
                type === 'text' ? validateText : ''
            ]"
        />
        <span class="field__validate">Поле не должно быть пустым</span>
    </label>
</template>
<script setup lang="ts">
    import { phoneMask } from '@/tools/helpers'
    import { useModelProxy } from '@/tools/useModelProxy';

    interface InputProps {
        id: string,
        name: string,
        type?: string,
        required?: boolean,
        disabled?: boolean,
        placeholder?: string,
        modelValue?: string,
        maxlength?: number,
        minlength?: number
    }

    const props = withDefaults(defineProps<InputProps>(), {
        type: 'text'
    })
    const emit = defineEmits(['update:modelValue']);
    const maskFn = (value:string) => phoneMask(value)
    const validateText = (value:string) => value.replace(/\d/g, '')
    const model = useModelProxy();
</script>

<style lang="scss">
    .field {
  box-sizing: border-box;
  background-color: white;
  width: 100%;
  transition: var(--app-transition);
  position: relative;

  &__input {
      width: 100%;
      padding-right: 26px;
      font-size: 14px;
      line-height: 22px;
      border-radius: 4px;
      border: 1px solid #DDD;
      color: #545454;
      caret-color: #2F80ED;
      padding: 8px;
      transition: var(--app-transition);
      outline: none;
      box-sizing: border-box;
      
      &:focus {
        outline: none;
      }

      &:hover {
        border-color: #2F80ED;
      }

      &:focus-visible {
        border-color: #2F80ED;
      }
  }

  &__input::before {
      content: "";
      position: absolute;
      display: block;
      top: 12px;
      right: 8px;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M8.0026 14.6654C4.32071 14.6654 1.33594 11.6806 1.33594 7.9987C1.33594 4.3168 4.32071 1.33203 8.0026 1.33203C11.6845 1.33203 14.6693 4.3168 14.6693 7.9987C14.6652 11.6789 11.6828 14.6613 8.0026 14.6654ZM8.0026 9.9987C7.63441 9.9987 7.33594 10.2972 7.33594 10.6654C7.33594 11.0336 7.63441 11.332 8.0026 11.332C8.37079 11.332 8.66927 11.0336 8.66927 10.6654C8.66927 10.2972 8.37079 9.9987 8.0026 9.9987ZM8.0026 4.66536C7.63441 4.66536 7.33594 4.96384 7.33594 5.33203V7.9987C7.33594 8.36689 7.63441 8.66536 8.0026 8.66536C8.37079 8.66536 8.66927 8.36689 8.66927 7.9987V5.33203C8.66927 4.96384 8.37079 4.66536 8.0026 4.66536Z' fill='%23EB5757'/%3e%3c/svg%3e ");
      opacity: 0;
      transition: var(--app-transition);
      width: 16px;
      height: 16px;
      background-position: center;
      background-repeat: no-repeat;
  }

  &__input::placeholder {
      color: #A9A9A9;
  }

  &__input:invalid {
      border-color: #EB5757;
      color: #EB5757;
  }

  &__input:invalid &__input::before {
      opacity: 100%;
  }

  &__validate {
      color: #EB5757;
      font-size: 10px;
      line-height: 16px;
      text-align: right;
      width: 100%;
      display: block;
      opacity: 0;
  }

  &__input:invalid + &__validate {
    opacity: 100;
  }
}

</style>