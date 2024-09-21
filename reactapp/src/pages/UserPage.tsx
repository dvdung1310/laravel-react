import React, { useState } from 'react';
import axiosInstance from "../configs/axios";
import CookieService from '../services/CookieService';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const AssignTaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const location = useLocation();
  const { users_list } = location.state || {};
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const token = CookieService.get('access_token');
        console.log(token);
      await axiosInstance.post('auth/tasks', 
        { title, description, assigned_to: assignedTo },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Gửi thành công");
    } catch (error) {
      toast.error("Tài khoản không đúng");
      console.error('Error assigning task', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg space-y-4">
  <div>
    <label className="block text-gray-700 font-bold mb-2">Tiêu đề:</label>
    <input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      required
      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
  <div>
    <label className="block text-gray-700 font-bold mb-2">Chi tiết:</label>
    <textarea
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      required
      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    ></textarea>
  </div>
  <div>
        <label className="block text-gray-700 font-bold mb-2">Giao cho:</label>
        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Chọn người dùng</option>
          {users_list && users_list.map((user: any) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div> 
  <button
    type="submit"
    className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
  >
    Gửi
  </button>
</form>

  );
};

export default AssignTaskForm;
