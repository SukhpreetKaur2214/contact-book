<template>
  <div class="contact-list">
    <h1>Contact Book</h1>
    <input
      v-model="search"
      placeholder="Search contacts by first or last name"
      class="search-input"
    />
    <button @click="$router.push('/add')">Add New Contact</button>

    <ul>
      <li
        v-for="contact in filteredContacts"
        :key="contact.id"
        @click="$router.push(`/contact/${contact.id}`)"
        class="contact-item"
      >
        {{ contact.lastName }}, {{ contact.firstName }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { getContacts } from '../contactService.js'

export default {
  setup() {
    const contacts = ref([])
    const search = ref('')

    const loadContacts = () => {
      contacts.value = getContacts().sort((a, b) =>
        a.lastName.localeCompare(b.lastName)
      )
    }

    onMounted(() => loadContacts())

    const filteredContacts = computed(() => {
      if (!search.value) return contacts.value
      const term = search.value.toLowerCase()
      return contacts.value.filter(
        c =>
          c.firstName.toLowerCase().includes(term) ||
          c.lastName.toLowerCase().includes(term)
      )
    })

    return {
      contacts,
      search,
      filteredContacts,
    }
  },
}
</script>

<style scoped>
.contact-list {
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
}
.search-input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
}
.contact-item {
  cursor: pointer;
  padding: 0.3rem;
  border-bottom: 1px solid #ddd;
}
.contact-item:hover {
  background: #f0f0f0;
}
button {
  margin-bottom: 1rem;
}
</style>
