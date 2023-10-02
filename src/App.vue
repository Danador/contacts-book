
<template>
  <Header/>
  <SubHeader
    :list="categories"
    v-model="selected"
  />
  <Main :list="filteredContacts"/>
</template>

<script setup lang="ts">
  import Header from '@/modules/Header/views/Header.vue'
  import SubHeader from '@/modules/Header/components/SubHeader.vue'
  import Main from '@/modules/Main/views/Main.vue'
  import { contactsList } from '@/store/data'
  import { computed, onMounted, ref } from 'vue';

  const categories = [
    {
      title: 'все',
      value: 'all'
    },
    {
      title: 'родственники',
      value: 'relatives'
    },
    {
      title: 'коллеги',
      value: 'college'
    },
  ]

  const testList = [
      {
          id: 1,
          name: 'Олежа',
          phone: '+7(123)-123-12-31',
          email: 'asdad@sda.com',
          category: {
              title: 'коллеги',
              value: 'college'
          },
          dateCreate: '22.11.23'
      },
      {
          id: 2,
          name: 'Рус',
          phone: '+7(123)-123-12-31',
          email: 'asdad@sda.com',
          category: {
              title: 'родственники',
              value: 'relatives'
          },
          dateCreate: '22.11.23'
      }
  ]

  const contacts = contactsList()

  const selected = ref(categories[0])
  const filteredContacts = computed(() => 
    selected.value.value === 'all' ? [...contacts.Contacts] : contacts.Contacts.filter(i => i.category.value === selected.value.value)
  )

  onMounted(() => {
    contacts.Contacts = testList
  })
</script>

<style scoped>
</style>
