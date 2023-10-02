<template>
    <header class="header">
        <Icon
            class="header__logo"
            name="logo"
        />
        <h1 class="header__text">Книга контактов</h1>
    </header>
</template>

<script setup lang="ts">
    import Icon from '@/components/Icon.vue';
</script>

<style lang="scss">
    .header {
        padding: 8px 12px;
        background-color: #282828;
        color: #E0E0E0;
        display: flex;
        align-items: center;
        gap: 4px;
        font-weight: 700;

        &__logo {
            width: 31px;
            height: 24px;
        }
        &__text {
            font-size: 14px;
            line-height: 17px;
        }

        @media (min-width: 576px) {
            padding: 8px 32px;
            gap: 8px;
        }

        @media (min-width: 992px) {
            gap: 16px;
            &__logo {
            width: 42px;
            height: 32px;
            }
            &__text {
            font-size: 18px;
            line-height: 22px;
            }
        }

        @media (min-width: 1200px) {
            padding: 8px 48px;
        }
    }

</style>
