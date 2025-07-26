import React, { useState } from 'react';
import { Plus, Check, X, RotateCcw, CheckCircle2, Circle } from 'lucide-react';

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

  const handleToggleDone = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].done = !updatedTodos[index].done;
    setTodos(updatedTodos);
  };

  const pendingTodos = todos.filter((todo) => !todo.done);
  const completedTodos = todos.filter((todo) => todo.done);

  const renderPriorityBadge = (level) => {
    const base = 'text-xs font-bold px-3 py-1 rounded-full';
    switch (level) {
      case 'high':
        return <span className={`${base} bg-gradient-to-r from-red-400 to-red-600 text-white shadow-md`}>🔥 High</span>;
      case 'low':
        return <span className={`${base} bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md`}>❄️ Low</span>;
      default:
        return <span className={`${base} bg-gradient-to-r from-amber-400 to-amber-600 text-white shadow-md`}>⚡ Medium</span>;
    }
  };

  const getPrioritySelectColor = (level) => {
    switch (level) {
      case 'high': return 'border-red-300 focus:ring-red-400 focus:border-red-400';
      case 'low': return 'border-blue-300 focus:ring-blue-400 focus:border-blue-400';
      default: return 'border-amber-300 focus:ring-amber-400 focus:border-amber-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
            ✨ Todo Master
          </h1>
          <p className="text-gray-600 text-lg">Organize your life, one task at a time</p>
        </div>

        {/* Stats */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8 animate-bounce">
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500">{pendingTodos.length}</div>
              <div className="text-sm text-gray-600 font-medium">Pending Tasks</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500">{completedTodos.length}</div>
              <div className="text-sm text-gray-600 font-medium">Completed</div>
            </div>
          </div>
        </div>

        {/* Add Task Form */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={task}
                placeholder="What needs to be done? ✍️"
                onChange={(e) => setTask(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200 bg-white/80"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Circle className="w-5 h-5" />
              </div>
            </div>
            
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className={`px-4 py-3 border-2 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 transition-all duration-200 bg-white/80 ${getPrioritySelectColor(priority)}`}
            >
              <option value="high">🔥 High Priority</option>
              <option value="medium">⚡ Medium Priority</option>
              <option value="low">❄️ Low Priority</option>
            </select>
            
            <button
              onClick={handleAdd}
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Task
            </button>
          </div>
        </div>

        {todos.length === 0 ? (
          <div className="text-center py-16 animate-pulse">
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">Ready to get started?</h3>
            <p className="text-gray-500 text-lg">Add your first task above and begin your productive journey!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Pending Tasks */}
            {pendingTodos.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-orange-400 to-red-500 rounded-full"></div>
                  Pending Tasks ({pendingTodos.length})
                </h2>
                <div className="space-y-4">
                  {pendingTodos.map((item, index) => (
                    <div
                      key={`pending-${index}`}
                      className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:bg-white"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-3">
                            <Circle className="w-6 h-6 text-gray-400 flex-shrink-0" />
                            <span className="text-lg font-medium text-gray-800 break-words">
                              {item.text}
                            </span>
                          </div>
                          <div className="ml-9">
                            {renderPriorityBadge(item.priority)}
                          </div>
                        </div>
                        
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button
                            onClick={() => handleToggleDone(todos.indexOf(item))}
                            className="p-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors duration-200 shadow-md hover:shadow-lg"
                            title="Mark as complete"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(todos.indexOf(item))}
                            className="p-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors duration-200 shadow-md hover:shadow-lg"
                            title="Delete task"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Completed Tasks */}
            {completedTodos.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-green-400 to-emerald-500 rounded-full"></div>
                  Completed Tasks ({completedTodos.length})
                </h2>
                <div className="space-y-4">
                  {completedTodos.map((item, index) => (
                    <div
                      key={`completed-${index}`}
                      className="group bg-green-50/80 backdrop-blur-sm rounded-2xl shadow-lg border border-green-100 p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-3">
                            <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                            <span className="text-lg font-medium text-gray-500 line-through break-words">
                              {item.text}
                            </span>
                          </div>
                          <div className="ml-9 opacity-60">
                            {renderPriorityBadge(item.priority)}
                          </div>
                        </div>
                        
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button
                            onClick={() => handleToggleDone(todos.indexOf(item))}
                            className="p-2 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors duration-200 shadow-md hover:shadow-lg"
                            title="Mark as pending"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(todos.indexOf(item))}
                            className="p-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors duration-200 shadow-md hover:shadow-lg"
                            title="Delete task"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}