// src/contactService.js

export function getContacts() {
  return JSON.parse(localStorage.getItem('contacts') || '[]')
}

export function saveContacts(contacts) {
  localStorage.setItem('contacts', JSON.stringify(contacts))
}

export function getContactById(id) {
  const contacts = getContacts()
  return contacts.find(c => c.id === id)
}

export function addContact(contact) {
  const contacts = getContacts()
  const newContact = { ...contact, id: Date.now().toString() }
  contacts.push(newContact)
  saveContacts(contacts)
  return newContact
}

export function updateContact(updatedContact) {
  const contacts = getContacts().map(c =>
    c.id === updatedContact.id ? updatedContact : c
  )
  saveContacts(contacts)
}

export function deleteContact(id) {
  const contacts = getContacts().filter(c => c.id !== id)
  saveContacts(contacts)
}
