import React, { useState } from 'react';

export default function Todo() {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('medium');
  const [todos, setTodos] = useState([]);

  const handleAdd = () => {
    const trimmedTask = task.trim();
    if (trimmedTask === '') return;
    setTodos([...todos, { text: trimmedTask, done: false, priority }]);
    setTask('');
    setPriority('medium');
  };

  const handleDelete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  // Toggle
  const handleToggleDone = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].done = !updatedTodos[index].done;
    setTodos(updatedTodos);
  };

  const pendingTodos = todos.filter((todo) => !todo.done);
  const completedTodos = todos.filter((todo) => todo.done);

  const renderPriorityBadge = (level) => {
    const base = 'text-xs font-semibold px-2 py-0.5 rounded';
    switch (level) {
      case 'high':
        return <span className={`${base} bg-red-100 text-red-700`}>High</span>;
      case 'low':
        return <span className={`${base} bg-blue-100 text-blue-700`}>Low</span>;
      default:
        return <span className={`${base} bg-yellow-100 text-yellow-700`}>Medium</span>;
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-xl shadow-md font-sans">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Todo App</h2>

      
      <div className="text-sm text-center text-gray-600 mb-4">
        {pendingTodos.length} pending, {completedTodos.length} completed
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4 animate-bounce">
        <input
          type="text"
          value={task}
          placeholder="Enter a task..."
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-green-300"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition"
        >
          Add
        </button>
      </div>

      {todos.length === 0 ? (
        <p className="text-center text-gray-500 mt-6">No tasks yet. Add one above! 🚀</p>
      ) : (
        <>
          {/* Pending Section */}
          {pendingTodos.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-lg text-gray-700 mb-2">Pending</h3>
              <ul className="space-y-3">
                {pendingTodos.map((item, index) => (
                  <li
                    key={`pending-${index}`}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-100 rounded-md shadow-sm transition-all duration-300 ease-in-out hover:scale-[1.01]"
                  >
                    <div className="flex-1 mr-4 mb-2 sm:mb-0">
                      <span className="block text-base text-gray-800 break-words">
                        {item.text}
                      </span>
                      <div className="mt-1">{renderPriorityBadge(item.priority)}</div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleToggleDone(todos.indexOf(item))}
                        className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition"
                      >
                        Mark as Done
                      </button>
                      <button
                        onClick={() => handleDelete(todos.indexOf(item))}
                        className="px-3 py-1 bg-red-600 text-white rounded-md text-sm font-semibold hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Completed Section */}
          {completedTodos.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg text-gray-700 mb-2">Completed</h3>
              <ul className="space-y-3">
                {completedTodos.map((item, index) => (
                  <li
                    key={`done-${index}`}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-white rounded-md shadow-sm opacity-80 transition-all duration-300 ease-in-out"
                  >
                    <div className="flex-1 mr-4 mb-2 sm:mb-0">
                      <span className="block text-base text-gray-400 line-through break-words">
                        {item.text}
                      </span>
                      <div className="mt-1">{renderPriorityBadge(item.priority)}</div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleToggleDone(todos.indexOf(item))}
                        className="px-3 py-1 bg-yellow-500 text-white rounded-md text-sm font-semibold hover:bg-yellow-600 transition"
                      >
                        Undo
                      </button>
                      <button
                        onClick={() => handleDelete(todos.indexOf(item))}
                        className="px-3 py-1 bg-red-600 text-white rounded-md text-sm font-semibold hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}
