import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../redux/userSlice";
import axios from "axios";
import "../styles/Home.css";
import EditUserModal from "../components/EditModal";

function Home() {
  const dispatch = useDispatch();
  const { userList } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      dispatch(setUsers(response.data.result));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      const updatedUsers = userList.filter((user) => user._id !== id);
      dispatch(setUsers(updatedUsers));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsEditing(true);
  };
  return (
    <div className="container">
      <h1>All Users</h1>
      <ul>
        {userList.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email}
            <div>
              <button className="edit-btn" onClick={() => handleEdit(user)}>
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(user._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {isEditing && (
        <EditUserModal user={currentUser} onClose={() => setIsEditing(false)} fetchUsers={fetchUsers} />
      )}
    </div>
  );
}

export default Home;
