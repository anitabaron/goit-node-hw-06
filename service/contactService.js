const Contact = require("../models/schemaContact");

const getAllContacts = async (filter = {}) => {
  return await Contact.find(filter);
};

const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

const addContact = async (body) => {
  return await Contact.create(body);
};

const updateContact = async (contactId, body) => {
  return await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
    runValidators: true,
    strict: "throw",
  });
};

const removeContact = async (contactId) => {
  return await Contact.findByIdAndDelete(contactId);
};

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
