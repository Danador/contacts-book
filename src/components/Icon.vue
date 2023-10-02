<template>
    <svg
        :class="`icon icon--size-${size ? size : 'normal'}`"
    >
        <use :xlink:href="`/all-icons.svg#${name}`"></use>
    </svg>
</template>
<script setup lang="ts">

    interface IconProps {
        name: string,
        size?: string
    }

    const props = defineProps<IconProps>();
</script>

<style lang="scss">
    .icon {
        &--size-normal {
            width: 16px;
            height: 16px;
        }
    }
</style>