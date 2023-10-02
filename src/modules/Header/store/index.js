import { defineStore } from "pinia";

export const useHeaderStore = defineStore('header', {
    state: () => ({
      addContact: false,
      showContact: false,
    }),
    actions: {
      toggleAddContact() {
        this.addContact = !this.addContact;
      },
      toggleShowContact() {
        this.showContact = !this.showContact
      }
    },
  });