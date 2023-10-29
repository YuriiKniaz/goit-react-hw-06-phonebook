import React from 'react';
import app from './App.module.css';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { getContacts, getFilter } from 'redux/selector';
import { setFilter } from 'redux/filterSlice';
import { deleteContact } from 'redux/contactsSlice';
import { useDispatch, useSelector } from 'react-redux';

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const onDeleteContacts = id => {
    dispatch(deleteContact(id));
  };

  const onFilter = e => {
    dispatch(setFilter(e.target.value));
  };

  const getFilteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={app.block}>
      <h1 className={app.firstTitle}>Phonebook</h1>
      <ContactForm />

      <h2 className={app.secondTitle}>Contacts</h2>
      <Filter filter={filter} onFilterChange={onFilter} />
      <ContactList
        contacts={getFilteredContacts}
        deleteContact={onDeleteContacts}
      />
    </div>
  );
};
