<template>
    <div 
        class="dropdown"
        :class="open && 'active'"
    >
        <button 
            @click="open = !open"
            :class="open && 'active'"
            class="dropdown__button"
        >
            <p class="dropdown__text">{{ model?.title }}</p>
            <Icon 
                class="dropdown__icon"
                name="triangle"
            />
        </button>
        <ul 
            class="dropdown__list"
        >
            <li 
                v-for="(category, i) in list"
                :key="i"
                :class="count === i ? 'active' : ''"
                class="dropdown__list-item"
            >
                <button
                    :disabled="count === i"
                    class="dropdown__list-button"
                    @click="
                        model = category, 
                        open = false,
                        count = i
                    "
                >{{ category.title }}</button>
                <Icon
                    v-if="count === i"
                    class="dropdown__list-icon" 
                    name="check"
                />
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
    import Icon from '@/components/Icon.vue';
    import { useModelProxy } from '@/tools/useModelProxy'
    import { ref } from 'vue';

    type Category = {
        title: string,
        value: string,
    }

    interface DropdownProps {
        modelValue: object,
        list: Array<Category>,
        small?: boolean
    }

    const props = defineProps<DropdownProps>();
    const emits = defineEmits(['update:modelValue']);

    const model = useModelProxy();

    const open = ref<boolean>(false);
    const count = ref<number>(0)
</script>

<style lang="scss">
    .dropdown {
        background-color: #FFF;
        border-radius: 4px;
        box-sizing: border-box;
        padding: 10px 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        border: 1px solid #DDD;
        transition: var(--app-transition);
        width: 100%;
        max-width: 235px;
        position: relative;

        &__button {
            display: flex;
            justify-content: space-between;
            gap: 8px;
            width: 100%;
            align-items: center;
        }

        &__text {
            color: #545454;
            font-weight: 700;
            font-size: 14px;
            line-height: 20px;
            text-transform: uppercase;
        }

        &__icon {
            color: #A9A9A9;
        }

        &:hover {
            border-color: #2F80ED;
        }

        &.active {
            border-color: #2F80ED;
        }

        &__list {
            position: absolute;
            top: 48px;
            left: 0px;
            opacity: 0;
            visibility: hidden;
            transition: var(--app-transition);
            box-shadow: 0px 0px 6px 0px #94B5E159;
            display: grid;
            border-radius: 4px;
            background-color: white;
            z-index: 10;
            padding: 0;
            margin: 0;
            width: 100%;
        }

        &.active &__list {
            opacity: 100;
            visibility: visible;
        }

        &__list-item {
            padding: 10px 16px;
            color: #545454;
            display: grid;
            grid-template-columns: 1fr auto;
            align-items: center;
            gap: 4px;
            font-size: 14px;
            line-height: 20px;
            transition: var(--app-transition);
        }

        &__list-button {
            text-transform: uppercase;
            text-align: left;

            &:disabled {
                pointer-events: none;
            }
        }

        &__list-item:hover {
            background-color: #EAF2FD;
        }

        &__list-item.active {
            font-weight: 700;
        }
    }
</style>
