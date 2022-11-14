import Trash from '../../assets/TrashIcon.png'
import Edit from '../../assets/EditIcon.png'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteTodo } from '../../features/todo/todoSlice'

const TodoInput = ({ todo }) => {
    const [input, setInput] = useState()
    const [edit, setEdit] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
        setInput(todo.name)
        if(todo.name === '') setEdit(false)
        else setEdit(true)
    }, [todo])

    const handleEdit = () => {
        setEdit(false)
    }

    const handleTrash = (todo) => {
        dispatch(deleteTodo(todo.id))
    }

    const handleTodoInput = (text) => {
        if (text.length >= 1 && text.length <= 25) {
            setInput(text)
        }
    }

    return (
        <div className="border-2 border-b-black w-full h-[50px] flex items-center justify-between">
            <input value={input} className={edit ? '' : 'border-2 border-black rounded'} onChange={(e) => handleTodoInput(e.target.value)} disabled={edit} />
            {!edit ? <button onClick={()=>setEdit(true)} className="w-[20%] h-[40px] border-t border-l-2 border-r-4 border-b-4 border-black shadow-2xl bg-gray-800 hover:bg-blue-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded">
                Save</button> : <div className="flex">
                <img src={Edit} onClick={handleEdit} className='w-[28px] h-[28px]' alt="edit" />
                <img src={Trash} onClick={() => handleTrash(todo)} className='w-[28px] h-[28px]' alt="trash" />
            </div>}
        </div>
    )
}

export default TodoInput;