import { createSlice  } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { loadState } from '../../utils';

export const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: loadState() ? loadState() : []
    },
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: uuidv4(),
                name: "",
            };

            state.todos.unshift(todo);
        },

        updateTodo: (state, action) => {
            state.todos = state.todos.map(todo => {
                if(todo.id === action.payload.id) {
                    todo.name = action.payload.text
                }
                return todo
            })
        },

        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload)
        },

        addTodoList: (state, action) => {
            console.log('changinmg')
            state.todos = action.payload;
        }
    }
});

// this is for dispatch
export const { addTodo, updateTodo, deleteTodo, addTodoList } = todoSlice.actions;

// this is for configureStore
export default todoSlice.reducer;