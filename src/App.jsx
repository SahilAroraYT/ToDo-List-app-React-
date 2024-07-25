import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { RiDeleteBin6Line } from "react-icons/ri";


function App() {



  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {

    let storedTaskString = localStorage.getItem("tasks")
    if (storedTaskString) {

      let storedTask = JSON.parse(localStorage.getItem("tasks"))
      setTasks(storedTask)
    }

  }, [])


  const filteredTasks = tasks.filter(item => item.text.toLowerCase().includes(searchQuery.toLowerCase()))



  const handleAdd = () => {
    if (newTask != "") {

      const newTaskItem = { id: uuidv4(), text: newTask };
      const updatedTasks = [...tasks, newTaskItem];
      setTasks(updatedTasks);
      setNewTask("");
      saveTask(updatedTasks)
    }
  }

  const handleEnterKey = (e) => {
    if(e.key == 'Enter'){
      handleAdd()
    }
  }

  const handleDelete = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    saveTask(updatedTasks)
  }

  const saveTask = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }

  return (
    <>
      <div className="mx-auto josefin-sans-h1 my-5 text-[#f8f9fa] flex flex-col items-center">

        <h1 className="text-[40px] ">
          Todo List
        </h1>

        <input type="text" name='search' placeholder='search todos' className='xl:w-1/4 sm:w-3/4 josefin-sans-other bg-[#2A2649] py-[6px] px-[12px] rounded-lg my-5' value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value) }} />

        <div className="todos w-full mx-auto">

          {filteredTasks.map(item => {
            return (<div className='todo xl:w-1/4 sm:w-3/4 bg-[#423A6F] my-1 josefin-sans-other mx-auto py-[8px] px-[16px] text-[23px] flex justify-between items-center h-fit text-wrap' key={item.id} style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
              <div className='w-3/4'>{item.text}</div>
              <span className='hover:cursor-pointer' onClick={(e) => { handleDelete(item.id) }}><RiDeleteBin6Line /></span>

            </div>

            )

          })}

        </div>

        <h2 className="text-[23px] mt-5">
          Add a new todo...
        </h2>

        <input type="text" name='task' className='xl:w-1/4 sm:w-3/4 josefin-sans-other bg-[#2A2649] py-[6px] px-[12px] rounded-lg my-1 mb-5' value={newTask} onChange={e => { setNewTask(e.target.value) }} onKeyDown={handleEnterKey} />
        <br />
        <button className='bg-[#F8F9FA] text-black w-28 rounded-xl px-[12px] py-[6px] h-10 josefin-sans-other hover:bg-[#352F5B] hover:border-white hover:border hover:text-white' onClick={handleAdd}>Add</button>

      </div>
    </>
  )
}

export default App
