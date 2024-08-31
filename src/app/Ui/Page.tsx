"use client";

import React, { useState } from 'react';

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

function ToDo() {
  const [addToDo, setAddToDo] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null); 
  console.log("task",tasks);

// Add task 

  const addTask = () => {
    if (isEditing !== null) {
      const updatedTasks = tasks.map((item) =>
        item.id === isEditing ? { ...item, name: addToDo } : item
      );
      setTasks(updatedTasks);
      setIsEditing(null); 
    } else {
    setTasks([...tasks, { id: tasks.length + 1, name: addToDo, completed: false }]);
    }
    setAddToDo(''); 
  };

  // Edited Task

  const editTask = (id: number, name: string) => {
    setIsEditing(id); 
    setAddToDo(name); 
  };

// Delete Task

  const removeItem = (id: number) => {
    const filteredTask = tasks.filter((item) => item.id !== id);
    setTasks(filteredTask);
  };

  // Task Completed 

  const completeTask = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

    // Complete Task Length

  const completedTaskLength = tasks.filter(item => item.completed === true).length

  return (
    <div className="flex flex-col justify-center gap-y-10">
      <h1 className="font-bold text-blue-500">ToDo</h1>
      <div className="h-40 w-64 border rounded border-black flex flex-row justify-center items-center gap-x-5 ">
        <h1>Task Done  <br/>Keep it up</h1>
        <div className="h-20 w-20 border rounded border-black bg-green-500 text-white flex justify-center items-center" >
          <p>{completedTaskLength}/{tasks.length}</p>
        </div>
      </div >
      <div className="flex flex-row gap-x-3">
        <input
          type="text"
          placeholder="Enter Task"
          className="p-3"
          value={addToDo}
          onChange={(e) => setAddToDo(e.target.value)}
        />
        <button
          className="bg-green-500 text-black border rounded-full p-2"
          onClick={addTask}
        >
          {isEditing !== null ? 'Save' : '+'} 
        </button>
      </div>
      <div className="h-auto w-80 border rounded border-black p-5">
        {tasks.map((item) => (
          <div key={item.id} className="flex flex-row justify-between p-3">
            <div className="flex flex-row gap-x-2">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => completeTask(item.id)}
              />
              <p style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
                {item.name}
              </p>
            </div>
            <div className="flex flex-row gap-x-2">
              <button
                className="bg-blue-500 text-white p-2 border rounded"
                onClick={() => editTask(item.id, item.name)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white p-2 border rounded"
                onClick={() => removeItem(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ToDo;
