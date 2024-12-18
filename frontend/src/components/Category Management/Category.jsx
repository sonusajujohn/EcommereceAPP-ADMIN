import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: '', description: '' });
  const [editId, setEditId] = useState(null);

  // Fetch Categories
  useEffect(() => {
    axios.get('/api/categories')
      .then((response) => setCategories(response.data))
      .catch((error) => alert(error.response?.data?.message || 'Failed to fetch categories'));
  }, []);
  

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const endpoint = editId ? `/api/categories/${editId}` : '/api/categories';
    const method = editId ? 'put' : 'post';

    axios[method](endpoint, form)
      .then((response) => {
        alert(response.data.message);
        setForm({ name: '', description: '' });
        setEditId(null);
        return axios.get('/api/categories');
      })
      .then((response) => setCategories(response.data))
      .catch((error) => alert(error.response.data.message || 'Error occurred'));
  };

  // Handle Edit
  const handleEdit = (category) => {
    setForm({ name: category.name, description: category.description });
    setEditId(category._id);
  };

  // Handle Delete
  const handleDelete = (id) => {
    axios.delete(`/api/categories/${id}`)
      .then((response) => {
        alert(response.data.message);
        setCategories(categories.filter((category) => category._id !== id));
      })
      .catch((error) => alert(error.response.data.message || 'Error occurred'));
  };

  return (
    <div>
      <h1>Category Management</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Category Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button type="submit">{editId ? 'Update' : 'Create'}</button>
      </form>
      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            <strong>{category.name}</strong>: {category.description}
            <button onClick={() => handleEdit(category)}>Edit</button>
            <button onClick={() => handleDelete(category._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
