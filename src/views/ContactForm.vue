<template>
  <div class="contact-form">
    <h2>{{ isEdit ? 'Edit Contact' : 'Add New Contact' }}</h2>

    <form @submit.prevent="handleSubmit">
      <label>
        First Name:
        <input v-model="contact.firstName" required />
      </label>
      <label>
        Last Name:
        <input v-model="contact.lastName" required />
      </label>
      <label>
        Email:
        <input type="email" v-model="contact.email" required />
      </label>
      <label>
        Phone:
        <input v-model="contact.phone" />
      </label>
      <label>
        Address:
        <input v-model="contact.address" />
      </label>

      <button type="submit">{{ isEdit ? 'Update' : 'Add' }}</button>
      <button type="button" @click="$router.push(isEdit ? `/contact/${contact.id}` : '/')">
        Cancel
      </button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  getContactById,
  addContact,
  updateContact,
} from '../contactService.js'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const id = route.params.id
    const isEdit = !!id
    const contact = ref({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      id: '',
    })

    onMounted(() => {
      if (isEdit) {
        const existing = getContactById(id)
        if (existing) {
          contact.value = { ...existing }
        }
      }
    })

    const handleSubmit = () => {
      if (isEdit) {
        updateContact(contact.value)
        router.push(`/contact/${contact.value.id}`)
      } else {
        const newContact = addContact(contact.value)
        router.push(`/contact/${newContact.id}`)
      }
    }

    return { contact, isEdit, handleSubmit }
  },
}
</script>

<style scoped>
.contact-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
}
label {
  display: block;
  margin-bottom: 0.5rem;
}
input {
  width: 100%;
  padding: 0.3rem;
  margin-top: 0.2rem;
  margin-bottom: 1rem;
  box-sizing: border-box;
}
button {
  margin-right: 1rem;
}
</style>
