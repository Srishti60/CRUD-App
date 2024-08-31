"use client";

import React, { useState } from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { MdEditDocument } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

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

  const[searchValue, setSearchValue] = useState<string>('');

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

  // SearchValue

  const filteredTasks = searchValue
    ? tasks.filter((item) =>
        item.name.toLowerCase().startsWith(searchValue.toLowerCase())
      )
    : tasks;

  return (
    <div className="flex flex-col justify-center gap-y-10 h-auto w-80">
      <h1 className="font-bold text-white text-3xl text-center">ToDo App</h1>
      <input type='text' placeholder='Search ToDo...' value={searchValue} onChange={(e)=> setSearchValue(e.target.value)}  className='p-2 bg-gray-800 text-gray-100 border rounded border-gray-800' />
      <div className="h-40 w-full border rounded border-white flex flex-row justify-center items-center gap-x-12 ">
       
        <h1 className='text-white text-left text-xl'><span className='text-2xl'>Task Done</span><br/>Keep it up</h1>
        <div className="h-20 w-20 border rounded-full border-black bg-lime-400 text-black text-2xl flex justify-center items-center font-semibold" >
          <p>{completedTaskLength}/{tasks.length}</p>
        </div>
      </div >
      <div className="flex flex-row gap-x-3">
        <input
          type="text"
          placeholder="Enter Task"
          className="p-2 bg-gray-800 text-gray-100 border border-gray-800 rounded w-72"
          value={addToDo}
          onChange={(e) => setAddToDo(e.target.value)}
        />
        <button
          className="bg-lime-400 text-black border rounded-full h-12 w-12 text-xl font-semibold flex items-center justify-center"
          onClick={addTask}
        >
          {isEditing !== null ? <MdEdit /> : <IoMdAdd />} 
        </button>
      </div>
      <div className='flex flex-col gap-y-4'>
        {filteredTasks.map((item) => (
          <div key={item.id} className="flex flex-row items-center justify-between p-3 h-14 border border-white w-full">
            <div className="flex flex-row gap-x-2">
              <input
                type="radio"
                checked={item.completed}
                onChange={() => completeTask(item.id)}
                style={{backgroundColor: item.completed ? 'lime-green':''}}
              />
              <p style={{textDecoration: item.completed ? 'line-through' : 'none' }} className='text-white font-semibold'>
                {item.name}
              </p>
            </div>
            <div className="flex flex-row  gap-x-2">
              <MdEditDocument  className="text-white text-2xl"
                onClick={() => editTask(item.id, item.name)} />
              <MdDeleteOutline  className="text-white text-2xl" onClick={() => removeItem(item.id)} />
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ToDo;
