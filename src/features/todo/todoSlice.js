import { createSlice  } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [
            {
                name: 'pay bills',
                id: 1
            },
            {
                name: 'workout',
                id: 2
            }
        ]
    },
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: uuidv4(),
                name: "",
            };

            state.todos.unshift(todo);
        },

        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload)
        }
    }
});

// this is for dispatch
export const { addTodo, deleteTodo } = todoSlice.actions;

// this is for configureStore
export default todoSlice.reducer;