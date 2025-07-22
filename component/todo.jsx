import React, { useState } from 'react';

export default function Todo() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  const handleAdd = () => {
    const trimmedTask = task.trim();
    if (trimmedTask === '') return;
    setTodos([...todos, { text: trimmedTask, done: false }]);
    setTask('');
  };

  const handleDelete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const handleMarkDone = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].done = true;
    setTodos(updatedTodos);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Todo App</h2>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={task}
          placeholder="Enter a task..."
          onChange={(e) => setTask(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleAdd} style={styles.addButton}>
          Add
        </button>
      </div>
      <ul style={styles.list}>
        {todos.map((item, index) => (
          <li
            key={index}
            style={{
              ...styles.listItem,
              backgroundColor: index % 2 === 0 ? '#f1f1f1' : '#ffffff',
            }}
          >
            <span
              style={{
                ...styles.listText,
                textDecoration: item.done ? 'line-through' : 'none',
                color: item.done ? '#999' : '#333',
              }}
            >
              {item.text}
            </span>
            <div style={styles.buttonGroup}>
              {!item.done && (
                <button onClick={() => handleMarkDone(index)} style={styles.doneButton}>
                  Mark as Done
                </button>
              )}
              <button onClick={() => handleDelete(index)} style={styles.deleteButton}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}


const styles = {
  container: {
    maxWidth: '500px',
    margin: '60px auto',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    backgroundColor: '#fefefe',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    color: '#222',
    fontSize: '24px',
    marginBottom: '20px',
  },
  inputContainer: {
    display: 'flex',
    marginBottom: '20px',
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #bbb',
    marginRight: '10px',
    fontSize: '16px',
  },
  addButton: {
    padding: '10px 16px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 15px',
    marginBottom: '10px',
    borderRadius: '6px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  },
  listText: {
    fontSize: '16px',
    flex: 1,
    marginRight: '10px',
    wordBreak: 'break-word',
  },
  buttonGroup: {
    display: 'flex',
    gap: '8px',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    border: 'none',
    color: 'white',
    padding: '8px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  doneButton: {
    backgroundColor: '#007bff',
    border: 'none',
    color: 'white',
    padding: '8px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};
