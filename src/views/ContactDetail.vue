<template>
  <div class="contact-detail" v-if="contact">
    <h2>{{ contact.firstName }} {{ contact.lastName }}</h2>
    <p><strong>Email:</strong> {{ contact.email }}</p>
    <p><strong>Phone:</strong> {{ contact.phone || '-' }}</p>
    <p><strong>Address:</strong> {{ contact.address || '-' }}</p>

    <button @click="editContact">Edit</button>
    <button @click="deleteContact">Delete</button>
    <button @click="goBack">Back to Contacts</button>
  </div>
  <p v-else>Contact not found.</p>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getContactById, deleteContact as deleteContactService } from '../contactService.js'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const contact = ref(null)

    const loadContact = () => {
      const id = route.params.id
      contact.value = getContactById(id?.toString())
    }

    onMounted(() => loadContact())

    // Watch for route changes (if user navigates to a different contact without full reload)
    watch(() => route.params.id, () => {
      loadContact()
    })

    const deleteContact = () => {
      if (confirm('Are you sure you want to delete this contact?')) {
        deleteContactService(route.params.id)
        router.push('/')
      }
    }

    const editContact = () => {
      router.push(`/edit/${route.params.id}`)
    }

    const goBack = () => {
      router.push('/')
    }

    return {
      contact,
      deleteContact,
      editContact,
      goBack,
    }
  },
}
</script>

<style scoped>
.contact-detail {
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
}
button {
  margin-right: 1rem;
}
</style>
