import { Route, Routes } from "react-router-dom";
import AllPost from "./routes/AllPost";
import CreatePost from "./routes/CreatePost";
import Update from "./routes/Update";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<CreatePost />}></Route>
        <Route path="/all" element={<AllPost />}></Route>
        <Route path="/:id" element={<Update />}></Route>

      </Routes>

    </div>
  );
}

export default App;
