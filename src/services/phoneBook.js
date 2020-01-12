import axios from 'axios';

const baseUrl = '/api/phonebook';

const getBook = () => {
  let req = axios.get(baseUrl)
  return req.then(response => response.data)
};

const newContact = (contact) => {
  let req = axios.post(baseUrl, contact)
  return req.then(response => response.data)
}

const deleteContact = (contactID) => {
  return axios.delete(`${baseUrl}/${contactID}`)
}

const changeNumber = (contactID, updatedContact) => {
  let req = axios.put(`${baseUrl}/${contactID}`, updatedContact)
  return req.then(response => response.data)
}

export default {
  getBook,
  newContact,
  deleteContact,
  changeNumber
}