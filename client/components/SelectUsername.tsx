import { useState } from "react";

export const SelectUsername = ({ setUsername }) => {
  const [newUsername, setNewUsername] = useState('');
  return (
    <div>
      <h1>Chat Application</h1>
      <input
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
      />
      <button
        onClick={() => {
          localStorage.setItem('username', newUsername);
          setUsername(newUsername);
        }}
      >
        Create username
      </button>
    </div>
  );
};
