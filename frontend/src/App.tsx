import { Route, Routes } from "react-router-dom";
import NotFound from "./page/NotFound";
import { lazy, Suspense, useState } from "react";
import ProtechtedRoute from "./components/ProtechtedRoute";
import Layout from "./components/Layout"; // 👈 Import layout
import AllProject from "./page/authorized_pages/AllProject";
import Project from "./page/authorized_pages/Project";
import AiAssistance from "./page/authorized_pages/AiAssistance";

const LandingPage = lazy(() => import("./page/LandingPage"));
const Login = lazy(() => import("./page/Login"));
const SignUp = lazy(() => import("./page/SignUp"));
const Dashboard = lazy(() => import("./page/authorized_pages/Dashboard"));

const App = () => {
  const [theme, setTheme] = useState<string>(
    localStorage.getItem("theme") ?? "light"
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected routes with sidebar layout */}
        <Route element={<ProtechtedRoute />}>
          <Route element={<Layout theme={theme} setTheme={setTheme} />}>
            <Route
              path="/dashboard"
              element={<Dashboard theme={theme} setTheme={setTheme} />}
            />
            <Route
              path="/all-projects"
              element={<AllProject theme={theme}/>}
            />
            <Route
              path="/project/:id"
              element={<Project/>}
            />
            <Route
              path="/intellio"
              element={<AiAssistance/>}
            />
            
          </Route>
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;
