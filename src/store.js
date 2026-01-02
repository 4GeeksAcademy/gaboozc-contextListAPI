// Minimal global store: contacts list plus reducer below to mutate it.
export const initialStore = () => {
  return {
    contacts: [
      // { id: 1, title: "gabriel", address: "123 Main St.", phone: "000-000-0000", email: "gabriel@mail.com" },
      // { id: 2, title: "alanis", address: "456 Elm St.", phone: "000-000-0000", email: "alanis@mail.com" },
      // { id: 3, title: "gianni", address: "789 Maple Ave.", phone: "000-000-0000", email: "gianni@mail.com" },
      // { id: 4, title: "giulianna", address: "321 Oak Dr.", phone: "000-000-0000", email: "giulianna@mail.com" },
      // { id: 5, title: "gianlucca", address: "654 Pine Ln.", phone: "000-000-0000", email: "gianluccae@mail.com" },
    ]
  }
}

export default function storeReducer(store = initialStore(), action = {}) {
  /**
   * Action shape: { type: string, payload?: any, contacts?: array }
   * Always return a new store object; never mutate the incoming store.
   */

  switch(action.type) {
    case "load_data": // Replace contacts with a fetched list
      return {
        ...store,
        contacts: action.contacts,
      };
    case "add_contact": // Append a new contact object
      return {
        ...store,
        contacts: [...store.contacts, action.payload],
      };
    case "edit_contact": // Swap the matching contact by id
      return {
        ...store,
        contacts: store.contacts.map(contact => contact.id === 
          action.payload.id ? action.payload : contact
        ),
      };
    case "delete_contact": // Drop the matching contact by id
      return {
        ...store,
        contacts: store.contacts.filter(contact => contact.id !== action.payload.id),
      };

    default: return store;
  }
}
