import form from './ContactForm.module.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getName, getNumber } from 'redux/selector';
import { addContacts, addName, addNumber } from 'redux/contactsSlice';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const name = useSelector(getName);
  const number = useSelector(getNumber);

  const onInputChange = ({ target: { name, value } }) => {
    if (name === 'name') {
      dispatch(addName(value));
    } else {
      dispatch(addNumber(value));
    }
  };

  const fromReset = () => {
    dispatch(addName(''));
    dispatch(addNumber(''));
  };

  const onSubmit = e => {
    e.preventDefault();
    const newContact = { name, number };
    const isExist = contacts.some(
      con => con.name.toLowerCase() === name.toLowerCase()
    );
    if (isExist) {
      alert(`${newContact.name} is already exist`);
      return;
    }
    dispatch(addContacts(newContact));
    fromReset();
  };

  return (
    <form className={form.form} onSubmit={onSubmit}>
      <label className={form.lable}>
        Name
        <input
          className={form.formInput}
          type="text"
          name="name"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={onInputChange}
          value={name}
        />
      </label>
      <label className={form.lable}>
        Number
        <input
          className={form.formInput}
          type="tel"
          name="number"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={onInputChange}
          value={number}
        />
      </label>
      <button className={form.formBtn} type="submit">
        Add contact
      </button>
    </form>
  );
};
