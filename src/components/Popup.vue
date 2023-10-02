<template>
    <div 
        :class="[
            'popup',
            open ? 'show' : '',
            {
                white: 'popup__white',
                black: 'popup__black'
            }[theme ? theme : 'white']
        ]"
        :style="`
            top: ${top};
            left: ${left};
        `"
    >
        <Icon
            class="popup__icon"
            name="circle-check"
        />
        <p class="popup__title">{{ title }}</p>
    </div>
</template>
<script setup lang="ts">
    import Icon from './Icon.vue';

    interface PopupProps {
        theme?: string,
        open: boolean,
        top?: string,
        left?: string,
        title: string
    }

    const props = withDefaults(defineProps<PopupProps>(), {
        left: '10px',
        top: '10px'
    })

</script>
<style lang="scss">
    .popup{
        position: absolute;
        z-index: 100;
        display: flex;
        align-items: center;
        gap: 4px;
        opacity: 0;
        visibility: hidden;
        transition: var(--app-transition);
        transform: translateX(-50%) translateY(-50%);

        &__icon {
            width: 16px;
            height: 16px;

            @media (min-width: 1920) {
                width: 24px;
                height: 24px;
            }
        }

        &__title {
            font-size: 14px;
            line-height: 22px;
        }

        &__white {
            box-shadow: 0px 0px 16px 0px #B0C5DE80;
            background-color: white;
            border-radius: 4px;
            padding: 8px 16px;
        }

        &__white &__title {
            color: #545454;
        }

        &__black {
            box-shadow: 0px 0px 20px 0px #B0C5DE80;
            background-color: #545454;
            border-radius: 40px;
            padding: 12px 16px;
        }

        &__black &__title {
            color: white;
        }

        &.show {
            opacity: 100;
            visibility: visible;
        }
    }
</style>