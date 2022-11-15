import { createSlice  } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { loadState } from '../../utils';

const LoadState = loadState('todoState')

export const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        // if there is localstorage data persisted, add it to the state else initialize with empty array
        todos: LoadState ? LoadState : []
    },
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: uuidv4(),
                name: "",
            };
            // add todo item to the beginning of the array
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
            state.todos = action.payload;
        }
    }
});

// this is for dispatch
export const { addTodo, updateTodo, deleteTodo, addTodoList } = todoSlice.actions;

// this is for configureStore
export default todoSlice.reducer;