import { Route, Routes } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import HomePage from "./component/Page/HomePage";
import PyqDashboard from "./component/Page/PyqDashboard";
import BranchCards from "./component/Page/BranchCards";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Parent layout route */}
      <Route path="/" element={<MainLayout />}>
        {/* Children go inside Outlet */}
        <Route index element={<HomePage />} />
        <Route path="/branch-selection" element={<BranchCards/>}/>
        
        <Route path="/pyq" element={<PyqDashboard/>}/>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
