import { Route, Routes } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import HomePage from "./component/Page/HomePage";
import PyqDashboard from "./component/Page/PyqDashboard";
import BranchCards from "./component/Page/BranchCards";

import NotFound from "./component/Page/NotFound";
import Discussion from "./component/Page/Discussion";


import Updates from "./component/Page/Updates";
import Resources from "./component/Page/Resources";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Parent layout route */}
      <Route path="/" element={<MainLayout />}>
        {/* Children go inside Outlet */}
        <Route index element={<HomePage />} />
        {/* Branch cards page */}
        <Route path="/pyqs" element={<BranchCards />} />

        {/* Dashboard page */}
        <Route path="/pyqs/list" element={<PyqDashboard />} />
        <Route path='/updates' element={<Updates/>}/>
        <Route path='/resources' element={<Resources/>}/>
     

                {/* Catch-all route inside layout */}
        <Route path="*" element={<NotFound />} />
      </Route>
         <Route path='/discussion' element={<Discussion/>}/>
    </Routes>
  );
};

export default AppRoutes;
