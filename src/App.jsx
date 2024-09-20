import React from "react";
import Upload from "./Components/Upload";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GetDetails from "./Components/getDetails";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Upload />} />
        <Route path="/data" element={<GetDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
