import { useState } from "react";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !phone || !email) {
      alert("All fields are required");
      return;
    }

    const newContact = { name, phone, email };

    if (editIndex !== null) {
      const updated = [...contacts];
      updated[editIndex] = newContact;
      setContacts(updated);
      setEditIndex(null);
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

        <button type="submit">{editIndex !== null ? "Update" : "Add"}</button>
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
          {contacts.map((contact, index) => (
            <tr key={index}>
              <td>{contact.name}</td>
              <td>{contact.phone}</td>
              <td>{contact.email}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
