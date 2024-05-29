import "./App.css";
import TeamDetailPage from "./pages/TeamDetailPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Main from "./pages/Main";
import Layout from "./pages/Layout";
import MyPage from "./pages/MyPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUpPage"; // 여기서 이름을 통일
import FindIdPage from "./pages/FindIdPage"; // 추가
import FindPasswordPage from "./pages/FindPasswordPage"; // 추가
import { LoginProvider, LoginContext } from "./context/LoginContext";
import { useContext } from "react";
import FAQ from "./pages/faq/FAQ";
import Notice from "./pages/notice/Notice";
import Notice1 from "./pages/notice/Notice1";
import Notice2 from "./pages/notice/Notice2";
import Notice3 from "./pages/notice/Notice3";
import Notice4 from "./pages/notice/Notice4";

const ProtectedRoute = ({ element }) => {
  const { user } = useContext(LoginContext);
  return user ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <LoginProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Main />} />
            <Route path="/FAQ" element={<FAQ />} />
            <Route path="/Notice" element={<Notice />} />
            <Route path="/Notice/Notice1" element={<Notice1 />} />
            <Route path="/Notice/Notice2" element={<Notice2 />} />
            <Route path="/Notice/Notice3" element={<Notice3 />} />
            <Route path="/Notice/Notice4" element={<Notice4 />} />
            <Route
              path="/TeamDetailPage/:teamName"
              element={<TeamDetailPage />}
            />
          </Route>
          <Route
            path="/MyPage"
            element={<ProtectedRoute element={<MyPage />} />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          {/* 여기서 이름 통일 */}
          <Route path="/find-id" element={<FindIdPage />} />
          <Route path="/find-password" element={<FindPasswordPage />} />
          <Route path="/find-id" element={<FindIdPage />} />
        </Routes>
      </Router>
    </LoginProvider>
  );
}

export default App;
