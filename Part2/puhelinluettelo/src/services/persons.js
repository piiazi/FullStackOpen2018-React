import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getPersons = () => {
   return axios.get(baseUrl);
}

const addPerson = (persons) => {
   return axios.post(baseUrl, persons);
}

const updatePerson = (id, person) => {
   return axios.put(`${baseUrl}/${id}`, person);
}

const delPerson = (id) => {
   return axios.delete(`${baseUrl}/${id}`);
}

export default { getPersons, addPerson, updatePerson, delPerson };
