import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";

function App() {
  return (
    <>
      <BrowserRouter basename="/customers-transactions/">
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
