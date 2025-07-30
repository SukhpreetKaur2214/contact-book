import { createRouter, createWebHistory } from 'vue-router'
import ContactList from '../views/ContactList.vue'
import ContactDetail from '../views/ContactDetail.vue'
import ContactForm from '../views/ContactForm.vue'

const routes = [
  { path: '/', name: 'Home', component: ContactList },
  { path: '/contact/:id', name: 'ContactDetail', component: ContactDetail },
  { path: '/add', name: 'AddContact', component: ContactForm },
  { path: '/edit/:id', name: 'EditContact', component: ContactForm },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
