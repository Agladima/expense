import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Expence from "./components/Expence";
import Builder from "./components/Builder";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Expence />} />
          <Route path="expense" element={<Expence />} />
          <Route path="builder" element={<Builder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
