import "./App.css";
import TeamDetailPage from "./pages/TeamDetailPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Layout from "./pages/Layout";
import MyPage from "./pages/MyPage";

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
          <Route path="/MyPage" element={<MyPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
