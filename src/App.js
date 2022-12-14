import Login from "./components/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoList from "./components/Todos/todolist";

function App() {

  return (
    <div className="w-full flex justify-center">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/todo" element={<TodoList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
