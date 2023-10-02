<template>
    <button
        :type="type ? type : 'button'"
        :disabled="disabled"
        :class="[
            'app-button',
            {
				yellow: 'app-button--style-yellow',
				blue: 'app-button--style-blue',
			}[theme ? theme : 'transparent'],
        ]"
    >
        <Icon 
            v-if="iconName" 
            :name="iconName" 
        />
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
    import Icon from './Icon.vue';

    interface ButtonProps {
        type?: "button" | "submit" | "reset" | undefined
        disabled?: boolean
        iconName: string
        theme: string
    }

    const props = defineProps<ButtonProps>();
</script>

<style lang="scss">
    .app-button {
        box-sizing: border-box;
        padding: 12px 16px;
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 14px;
        line-height: 17px;
        transition: var(--app-transition);

        &--style-yellow {
            border-radius: 4px;
            background-color: #FFC700;
            color: #545454;
        }
        
        &--style-yellow:hover {
            background-color: #FFD84C;
        }

        &--style-yellow:active {
            background-color: #F3C41E;
        }

        &--style-blue {
            border-radius: 28px;
            background-color: transparent;
            color: #2F80ED;
            border: 1px solid #2F80ED;

            &:hover {
                background-color: #2F80ED;
                color: white;
            }
        }
    }
</style>