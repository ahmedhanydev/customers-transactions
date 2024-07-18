import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;