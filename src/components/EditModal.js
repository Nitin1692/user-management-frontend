import React, {useState} from 'react';
import axios from 'axios';

const EditUserModal = ({ user, onClose, fetchUsers  }) => {
    const [name,setName] = useState(user.name)
    const [email,setEmail] = useState(user.email)
    const [password, setPassword] = useState(user.password)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedUser = {
            name: name,
            email: email,
            password: password
        };

        try {
            const response = await axios.put(`http://localhost:5000/api/users/${user._id}`, updatedUser);
            fetchUsers()
            onClose(); // Close the modal
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Edit User</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Name"
                        defaultValue={user.name} // Use defaultValue for controlled input
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        defaultValue={user.email} // Use defaultValue for controlled input
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input                        type="text"
                        placeholder="password"
                        defaultValue={user.password} // Use defaultValue for controlled input
                        required
                        onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Update User</button>
                </form>
            </div>
        </div>
    );
};

export default EditUserModal;
