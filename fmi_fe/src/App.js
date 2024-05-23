import "./App.css";
import TeamDetailPage from "./pages/TeamDetailPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Layout from "./pages/Layout";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Main />} />
            <Route
              path="/TeamDetailPage/:teamName"
              element={<TeamDetailPage />}
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
