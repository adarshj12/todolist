import { useEffect, useState } from 'react'
import './App.css'
import { BsFillTrashFill } from 'react-icons/bs'
import axios from './utils/axios'
import {ADD_TODO,GET_TODO,UPDATE_TODO,DELETE_TODO} from './utils/API'
import { Toaster,toast } from 'react-hot-toast'

function App() {
  const [newTodo,setNewTodo]=useState('')
  const [todos, setTodos] = useState([])
  const [flag, setFlag] = useState(true);

  useEffect(()=>{
    getTodo()
  },[flag])

  function getTodo(){
    axios.get(GET_TODO)
    .then(res=>{
      // console.log(res.data)
        setTodos(res.data)
    })
    .catch(err=>console.log(err.message))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if(newTodo.trim()==='') return;
    axios.post(ADD_TODO,{title:newTodo}).then(() => {
      toast.dismiss()
      toast.success('todo added')
      setFlag((prev) => !prev)
    }).catch(err=>{
      toast.dismiss()
      toast.error(err.response.data.message)
    })
    setNewTodo("")
    // console.log(todos)
  }

  function handleCheck(id,todo){
    // console.log(todos)
    axios.put(`${UPDATE_TODO}/${id}`).then(() => {
      setFlag((prev) => !prev)
    })
    toast.dismiss()
    if(todo.completed)  toast.error(`task ${todo.title} incomplete`)
    else toast.success(`task ${todo.title} completed`)
  }
  function deleteTodo(id,todo){
    axios.delete(`${DELETE_TODO}/${id}`).then(() => {
      setFlag((prev) => !prev)
    })
    toast.dismiss()
    toast.success(`task ${todo.title} incomplete`)
  }

  return (
    <>
    <div className='container'>
      <h1 >Todo List</h1>
      <form onSubmit={handleSubmit} className="row mt-5 justify-content-center">
        <div className="col-auto">
          <input type="text" value={newTodo} onChange={e => setNewTodo(e.target.value)} className="form-control inputr" placeholder="New Todo" 
          />
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary mb-3">Add Todo</button>
        </div>
      </form>
     
      {todos.length===0?<h2>No Todos Set</h2>: <h3>Tasks</h3>}
      <ul className="todo-list">
        {
          todos?.map(todo => {
            return (
              <li className="todo-item d-flex align-items-center justify-content-between" key={todo._id}>
                <label className="todo-label">
                  <input type="checkbox" checked={todo.completed} 
                  onChange={e=>handleCheck(todo._id,todo)}
                  />
                </label>
                {
                todo.completed?
                <label className="todo-title"><strike style={{ textDecoration: "line-through", textDecorationThickness: "5px" }}>{todo.title}</strike></label>
                :
                <label className="todo-title">{todo.title}</label>
                }
                <BsFillTrashFill onClick={()=>deleteTodo(todo._id,todo)} className="trash" />
              </li>
            )
          })
        }
      </ul>
      <Toaster/>
    </div>
    <div className='background-black' />
    </>
  )
}

export default App
