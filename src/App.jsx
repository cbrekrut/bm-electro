import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BirthdaySlideshow  from "./page";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BirthdaySlideshow  />} />
      </Routes>
    </Router>
  );
}

export default App;
