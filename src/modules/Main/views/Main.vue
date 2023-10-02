<template>
    <main>
        <section>
            <table>
                <thead>
                    <tr>
                        <th>КОНТАКТ</th>
                        <th>ТЕЛЕФОН</th>
                        <th>E-MAIL</th>
                        <th>СОЗДАН</th>
                    </tr>
                </thead>
                <tbody>
                    <TableRow
                        v-for="(contact, i) in list"
                        :key="i"
                        :data="contact"
                        @showContact="
                            showData = contact, 
                            getContactID(contact.id), 
                            headerStore.showContact = true
                        "
                    />
                </tbody>
            </table>
        </section>
    </main>
    <template
        v-for="(contact, i) in list"
        :key="i"
    >
        <Modal
            v-if="show === contact.id"
            class="contact"
            v-model="headerStore.showContact"
        >
            <div class="contact__container">
                <div class="contact__info-block">
                    <div v-if="contact.name" class="contact__info">
                        <span class="contact__first-letter">{{ contact.name[0] }}</span>
                        <p class="contact__name">{{ contact.name }}</p>
                    </div>
                    <div v-else class="contact__add">
                        <Icon class="contact__add-icon" name="add"/>
                        <p class="contact__add-text">Добавить контакт</p>
                    </div>
                    <button @click="headerStore.showContact = false, show = null">
                        <Icon
                            class="contact__close"
                            name="close"
                        />
                    </button>
                </div>
                <div class="contact__block">
                    <div class="form">
                        <h2 class="from__title">Контакт</h2>
                        <form 
                            @submit.prevent 
                            class="form__fields"
                        >
                            <fieldset 
                                v-for="(item, i) in fields" 
                                :key="i"
                                class="fieldset"
                            >
                                <p class="fieldset__label">{{ item.label }}</p>
                                <Input
                                    :id="item.id"
                                    :name="item.id"
                                    :type="item.type"
                                    :placeholder="item.placeholder"
                                    :required="true"
                                    v-model="showData[item.id]"
                                />
                            </fieldset>
                            <fieldset 
                                class="fieldset"
                            >
                                <p class="fieldset__label">Категория</p>
                                <Dropdown
                                    class="form__dropdown"
                                    :list="categories"
                                    v-model="showData.category"
                                />
                            </fieldset>
                            <fieldset class="fieldset">
                                <p class="fieldset__label">Создан</p>
                                <p>{{ contact.dateCreate }}</p>
                            </fieldset>
                        </form>
                        <div class="form__buttons">
                            <AppButton
                                @click="changeItem(contact.id)"
                                theme="yellow"
                                class="save-btn"
                                :class="saving ? 'disabled pulse' : ''"
                                :disabled="saving"
                                :iconName="saving ? 'loader' : 'save'"
                            >
                                СОХРАНИТЬ
                            </AppButton>
                            <button
                                @click="deleteItem(contact.id)" 
                                class="delete-btn"
                            >
                                <Icon name="trash"/>
                                <p>Удалить контакт</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    </template>
    <Modal
        class="contact"
        v-model="headerStore.addContact"
    >
        <div class="contact__container">
            <div class="contact__info-block">
                <div class="contact__add">
                    <Icon class="contact__add-icon" name="add"/>
                    <p class="contact__add-text">Добавить контакт</p>
                </div>
                <button @click="headerStore.addContact = false, show = null">
                    <Icon
                        class="contact__close"
                        name="close"
                    />
                </button>
            </div>
            <div class="contact__block">
                <div class="form">
                    <h2 class="from__title">Контакт</h2>
                    <form 
                        @submit.prevent 
                        class="form__fields"
                    >
                        <fieldset 
                            v-for="(item, i) in fields" 
                            :key="i"
                            class="fieldset"
                        >
                            <p class="fieldset__label">{{ item.label }}</p>
                            <Input
                                :id="item.id"
                                :name="item.id"
                                :type="item.type"
                                :placeholder="item.placeholder"
                                :required="true"
                                v-model="addData[item.id]"
                            />
                        </fieldset>
                        <fieldset 
                            class="fieldset"
                        >
                            <p class="fieldset__label">Категория</p>
                            <Dropdown
                                class="form__dropdown"
                                :list="categories"
                                v-model="addData.category"
                            />
                        </fieldset>
                    </form>
                    <div class="form__buttons">
                        <AppButton
                            @click="addItem()"
                            theme="yellow"
                            class="save-btn"
                            :class="saving ? 'disabled pulse' : ''"
                            :disabled="saving"
                            :iconName="saving ? 'loader' : 'save'"
                        >
                            СОХРАНИТЬ
                        </AppButton>
                    </div>
                </div>
            </div>
        </div>
    </Modal>
    <Popup
        :open="created"
        top="64px"
        left="50%"
        title="Контакт создан"
        theme="black"
    />
    <Popup
        :open="changed"
        title="Контакт изменен"
        top="calc(100vh - 64px)"
        left="32px"
    />
    <Popup
        :open="deleted"
        title="Контакт удалён"
        top="64px"
        left="50%"
    />
</template>

<script setup lang="ts">
    import TableRow from '@/components/TableRow.vue'
    import Modal from '@/components/Modal.vue'
    import Icon from '@/components/Icon.vue'
    import Dropdown from '@/components/Dropdown.vue'
    import AppButton from '@/components/AppButton.vue'
    import Input from '@/components/Input.vue'
    import Popup from '@/components/Popup.vue'
    import { useHeaderStore } from '@/modules/Header/store/'
    import { onMounted, ref, reactive, watch } from 'vue'
    import { phoneMask } from '@/tools/helpers'
    import { contactsList } from '@/store/data'

    type Contact = {
        id: number;
        name: string;
        phone: string;
        email: string;
        category: {
            title: string;
            value: string;
        };
        dateCreate: string;
    }

    interface Props {
        list: Contact[];
    }

    const props = defineProps<Props>();

    const showData = reactive<{[key: string]: any}>({})
    const addData = reactive<{[key: string]: any}>({})
    const show = ref<number | null>(null)
    const created = ref<boolean>(false)
    const changed = ref<boolean>(false)
    const deleted = ref<boolean>(false)
    
    const getContactID = (id: number) => show.value = id
    const headerStore = useHeaderStore()

    const fields = [
        {
            id: 'name',
            label: 'Имя',
            placeholder: 'Например «Андрей»...',
        },
        {
            id: 'phone',
            type: 'tel',
            label: 'Телефон',
            placeholder: '+7(___)-___-__-__'
        },
        {
            id: 'email',
            type: 'email',
            label: 'E-mail',
            placeholder: 'Например «pochta@domain.ru»...'
        }
    ]

    const categories = [
        {
            title: 'родственники',
            value: 'relatives'
        },
        {
            title: 'коллеги',
            value: 'college'
        },
    ]

    // const validateText = (value:string) => value.replace(/\d/g, '')

    watch(showData, () => {
        showData.phone = phoneMask(showData.phone)
        // formData.name = validateText(formData.name)
    })

    watch(addData, () => {
        addData.phone = phoneMask(addData.phone)
        // addData.name = validateText(addData.name)
    })

    let saving = ref<boolean>(false)
    const data = contactsList()

    const changeItem = (id: number) => {
        data.Contacts.forEach(element => {
            if (id === element.id) {
                element = showData
                saving.value = true
            }
        });
        setTimeout(() => {
            saving.value = false
            headerStore.showContact = false
        }, 2000);

        setTimeout(() => {
            changed.value = true
        }, 1000)
    }

    const deleteItem = (id: number) => {
        data.Contacts = data.Contacts.filter((i) => i.id !== id)
        deleted.value = true
    }

    watch(deleted, () => {
        if (deleted.value) {
            setTimeout(() => {
                deleted.value = false
            }, 2000)
        }
    })


    const getCurrentDate = () => {
        const today = new Date();
        return `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;
    }

    watch(changed, () => {
        if (changed.value) {
            setTimeout(() => {
                changed.value = false
            }, 2000)
        }
    })

    const addItem = () => {
        saving.value = true
        data.addToContacts({
            id: data.Contacts.length + 1,
            ...addData,
            dateCreate: getCurrentDate()
        })
        setTimeout(() => {
            saving.value = false
            headerStore.addContact = false
        }, 2000)

        created.value = true
    }

    watch(created, () => {
        if (created.value) {
            setTimeout(() => {
                created.value = false
            }, 2000)
        }
    })

    onMounted(() => {
        showData.category = showData.category ? showData.category : categories[0]
        addData.category = addData.category ? addData.category : categories[0]
    })
</script>

<style lang="scss">
    section {
        padding: 12px 32px 0px 32px;
    }

    table {
        width: 100%;
        max-width: 990px;
        margin: 0 auto;
    }

    th { 
        color: #B5B5B5;
        font-size: 10px;
        line-height: 16px;
        text-align: left;

        &:last-child {
            text-align: right;
        }
    }

    .contact {
        z-index: 100;
        &__container {
            display: grid;
            grid-template-rows: auto 1fr;
            height: 100%;
        }
        &__info-block{
            padding: 8px 12px;
            background-color: #282828;
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 10px;

            @media (min-width: 768px) {
                padding: 8px 32px;
            }
        }
        &__info {
            display: flex;
            gap: 8px;
            align-items: center;
            width: 100%;
            justify-content: center;
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
            text-transform: uppercase;
            font-weight: 700;
        }
        &__name {
            font-weight: 700;
            font-size: 20px;
            line-height: 24px;
            color: #DDD;
        }
        &__close {
            width: 32px;
            height: 32px;
            color: #939393;
        }
        &__block {
            background-color: #F9FCFF;
            height: 100%;
        }
        &__add {
            display: flex;
            gap: 8px;
            align-items: center;
            color: white;
            justify-content: center;
        }
        &__add-icon {
            width: 24px;
            height: 24px;
        }
        &__text {
            font-weight: 700;
            font-size: 20px;
            line-height: 25px;
        }
    }

    .form {
        width: 100%;
        max-width: 704px;
        padding: 48px 64px 64px 64px;
        background-color: #FFFFFF;
        box-shadow: 0px 0px 6px 0px #94B5E159;
        margin: 24px auto 0px auto;
        display: flex;
        flex-direction: column;
        gap: 24px;
        box-sizing: border-box;

        &__title {
            font-weight: 700;
            font-size: 24px;
            line-height: 30px;
            color: #545454;

            @media (min-width: 992px) {
                font-size: 32px;
                line-height: 39px;
            }
        }

        &__fields {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        &__dropdown {
            max-width: none;
        }

        &__buttons {
            display: flex;
            gap: 24px;
            align-items: center;
            justify-content: center;
            width: 100%;
        }
    }

    .fieldset {
        display: grid;
        align-items: center;
        gap: 20px;

        @media (min-width: 768px) {
            grid-template-columns: 136px 1fr;
            gap: 32px;
        }

        &__label {
            font-weight: 700;
            font-size: 14px;
            line-height: 17px;
            color: #545454;
        }

        &__input {
            width: 100%;
            max-width: 408px;
        }
    }

    .delete-btn {
        display: flex;
        color: #2F80ED;
        font-size: 12px;
        line-height: 15px;
        gap: 2px;
    }

    @keyframes pulse {
        50% {
            opacity: .5;
        }
    }
    .pulse {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    .save-btn {
        &.disabled {
            pointer-events: none;
        }
    }
</style>