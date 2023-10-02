<template>
    <div class="subheader">
        <div class="subheader__container">
            <Dropdown
                v-model="model"
                :list="list"
            />
            <AppButton
                iconName="plus"
                theme="blue"
                @click="headerStore.addContact = true"
            >
                ДОБАВИТЬ КОНТАКТ
            </AppButton>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Dropdown from '@/components/Dropdown.vue'
    import AppButton from '@/components/AppButton.vue'
    import { useModelProxy } from '@/tools/useModelProxy'
    import { useHeaderStore } from '@/modules/Header/store/'

    type Category = {
        title: string,
        value: string
    }

    interface Props {
        modelValue: object,
        list: Array<Category>
    }

    const props = defineProps<Props>();

    const emits = defineEmits(['update:modelValue']);
    const model = useModelProxy();

    const headerStore = useHeaderStore()
</script>

<style lang="scss">
    .subheader {
        background-color: #F9FCFF;
        padding: 8px 12px;
        box-sizing: border-box;
        border: 1px solid #EAF2FD;

        &__container {
            max-width: 990px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            gap: 16px;
        }

        @media(min-width: 768px) {
            padding: 8px 32px;
        }
    }
</style>