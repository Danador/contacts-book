import { defineStore } from 'pinia'

export const contactsList = defineStore({
  id: 'myStore',
  state: () => ({
    Contacts: []
  }),
  actions: {
    addToContacts(item) {
      this.Contacts.push(item)
    }
  }
})