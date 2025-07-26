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
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-xl shadow-md font-sans">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Todo App</h2>
      
      <div className="flex mb-4 animate-bounce">
        <input
          type="text"
          value={task}
          placeholder="Enter a task..."
          onChange={(e) => setTask(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md mr-2 text-base focus:outline-none focus:ring-2 focus:ring-green-300"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition"
        >
          Add
        </button>
      </div>

      <ul className="list-none p-0">
        {todos.map((item, index) => (
          <li
            key={index}
            className={`flex items-center justify-between p-3 mb-3 rounded-md shadow-sm ${
              index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
            }`}
          >
            <span
              className={`flex-1 mr-4 text-base break-words ${
                item.done ? 'line-through text-gray-400' : 'text-gray-800'
              }`}
            >
              {item.text}
            </span>

            <div className="flex gap-2">
              {!item.done && (
                <button
                  onClick={() => handleMarkDone(index)}
                  className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition"
                >
                  Mark as Done
                </button>
              )}
              <button
                onClick={() => handleDelete(index)}
                className="px-3 py-1 bg-red-600 text-white rounded-md text-sm font-semibold hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
