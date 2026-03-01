import { useState } from "react";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !phone || !email) {
      alert("All fields are required");
      return;
    }

    const phonePattern = /^9\d{9}$/;

    if (!phonePattern.test(phone)) {
      alert("Phone number must be 10 digits starting with 9");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Enter valid email address");
      return;
    }

    const newContact = { id: editId ? editId : Date.now(), name, phone, email };

    if (editId !== null) {
      const updated = [...contacts];
      const index = updated.findIndex((contact) => contact.id === editId);
      updated[index] = newContact;
      setContacts(updated);
      setEditId(null);
    } else {
      setContacts([...contacts, newContact]);
    }

    setName("");
    setPhone("");
    setEmail("");
  };

  const handleEdit = (index) => {
    setName(contacts[index].name);
    setPhone(contacts[index].phone);
    setEmail(contacts[index].email);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const filtered = contacts.filter((_, i) => i !== index);
    setContacts(filtered);
  };

  return (
    <div className="container">
      <h1>Contact Book</h1>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">{editId !== null ? "Update" : "Add"}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.phone}</td>
              <td>{contact.email}</td>
              <td className="actions">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(contact)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(contact.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
