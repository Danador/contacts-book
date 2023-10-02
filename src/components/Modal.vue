<template>
    <div 
        class="modal"
        :class="model ? 'open' : ''"
    >
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
    import { useModelProxy } from '@/tools/useModelProxy'

    type ModalType = {
        modelValue: boolean
    }

    const props = defineProps<ModalType>();

    const model = useModelProxy();

    const emits = defineEmits(['update:modelValue'])
</script>

<style lang="scss">
    .modal {
        position: fixed;
        inset: 0;
        width: 100%;
        height: 100%;
        z-index: 100;
        opacity: 0;
        transition: var(--app-transition);
        pointer-events: none;

        &.open {
            opacity: 100%;
            visibility: visible;
            pointer-events: auto;
        }
    }
</style>