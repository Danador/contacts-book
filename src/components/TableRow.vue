<template>
    <tr class="row">
        <td>
            <div class="row__info">
                <span 
                    v-if="!sm" 
                    class="row__first-letter"
                >{{ data.name[0] }}</span>
                <button 
                    @click="$emit('showContact')"
                    class="row__name"
                >
                    {{ data.name }}
                </button>
            </div>
        </td>
        <td>
            <p class="row__phone">{{ data.phone }}</p>
            <p v-if="md">{{ data.email }}</p>
        </td>
        <td v-if="!md">
            <p class="row__email">{{ data.email }}</p>
        </td>
        <td>
            <p class="row__date">{{ data.dateCreate }}</p>
        </td>
    </tr>
</template>

<script setup lang="ts">
    import useMedia from '@/tools/media';

    type RowData = {
        name: string,
        phone: string,
        email: string,
        dateCreate: string
    }

    interface RowProps {
        data: RowData
    }
    const  props = defineProps<RowProps>();
    const { sm, md } = useMedia

    const emit = defineEmits(['showContact'])
</script>

<style lang="scss">
    .row {
        position: relative;

        &__info {
            display: flex;
            gap: 8px;
            align-items: center;
        }

        &__first-letter {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 24px;
            height: 24px;
            text-align: center;
            border-radius: 999px;
            background-color: #FFC700;
            color: #545454;
        }

        &__date {
            font-size: 10px;
            line-height: 16px;
        }

        &__name {
            font-size: 12px;
            line-height: 14px;
            
            &::before {
                content: "";
                position: absolute;
                inset: 0;
                cursor: pointer;
            }

            @media (min-width: 576px) {
                line-height: 20px;
            }

            @media (min-width: 922px) {
                font-size: 14px;
                line-height: 22px;
            }
        }

        &__phone,
        &__email {
            font-size: 12px;
            line-height: 15px;
        }

        &__date {
            text-align: right;
            font-size: 10px;
            line-height: 16px;

            @media (min-width: 576px) {
                font-size: 12px;
                line-height: 20px;
            }
        }
    }
</style>