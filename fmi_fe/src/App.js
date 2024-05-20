import "./App.css";
import TeamDetailPage from "./pages/TeamDetailPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "./pages/sideBar/SideBar";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/TeamDetailPage/:teamName"
            element={<TeamDetailPage />}
          />
          <Route path="/sidebar" element={<SideBar />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
