import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addTodo } from "../../features/todo/todoSlice";
import TodoInput from "./TodoInput";
import { loadState, saveState } from "../../utils";

const TodoList = () => {
    const { todos } = useSelector(state => state.todos)
    const [todoList, setTodosList] = useState(todos)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        // redirect to login page if there is no login data persisted in localstorage
        const getLoginData = loadState('login');
        if(!getLoginData){
            navigate('/login')
        }
    },[])

    useEffect(() => {
        setTodosList(todos)
        // persist todoList in localstorage
        saveState('todoState',todos)
    },[todos])

    const handleAddTodo = () => {
        dispatch(addTodo(''))
    }

    const handleSearch = (searchText) => {
        const filteredTodos = todos.filter(todo => {
            return todo.name.toLowerCase().includes(searchText)
        })
        setTodosList(filteredTodos)
    }

    const handleLogout = () => {
        // remove login data from localstorage when user logs out
        localStorage.removeItem("login")
    }

    return (
        <div className="w-full mt-14 lg:mt-8 flex flex-col items-center gap-5">
            <h2 className="text-4xl font-bold">My To-Do List</h2>
            <div className="w-[30%] min-w-[375px] border border-black h-[800px] overflow-y-auto rounded">
                <div className="w-full h-[70px] flex justify-evenly items-center border border-b-black">
                    <div className="w-[35%] relative text-gray-600 focus-within:text-gray-400">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                            <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </button>
                        </span>
                        <input type="search" onChange={(e)=>handleSearch(e.target.value)} name="q" className="w-full h-[40px] py-2 text-sm text-white border border-black bg-white rounded-full pl-10 focus:outline-none focus:bg-white focus:text-gray-900" placeholder="search" autoComplete="off" />
                    </div>
                    <button onClick={handleAddTodo} className="w-[20%] h-[40px] border-t border-l-2 border-r-4 border-b-4 border-black shadow-2xl bg-blue-500 hover:bg-blue-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded">New</button>
                </div>
                <div className="flex flex-col">
                    {todoList && todoList.map((todo, index) => {
                        return <TodoInput todo={todo} key={todo.id} />
                    })}

                </div>
            </div>
            <Link to='/login'><div onClick={handleLogout} className="w-[6%] min-w-[100px] text-center h-[40px] mr-8 lg:mr-10 mt-2 absolute top-0 right-0 border-t border-l-2 border-r-4 border-b-4 border-black shadow-2xl bg-white hover:bg-gray-700 text-black uppercase text-sm font-semibold px-4 py-2 rounded">Logout</div></Link>
        </div>
    )
}

export default TodoList;