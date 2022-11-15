import Login from "./components/login";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import TodoList from "./components/Todos/todolist";

function App() {

  return (
    <div className="w-full flex justify-center">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/todo" element={<TodoList />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
