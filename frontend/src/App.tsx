import {BrowserRouter, Routes, Route} from "react-router-dom";
import React from "react";

import Home from "./pages/Home";
import Predict from "./pages/Predict";
import Result from "./pages/Result";

function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/predict" element={<Predict />} />
                <Route path="/result" element={<Result />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;