import DashboardInsight from "../components/DashboardInsight";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useStateContext } from "../context/ContextProvider";
const Dashboard = () => {
  const { activeMenu } = useStateContext();
  return (
      <div className="flex relative">
        {/* Sidebar */}
        {activeMenu ? (
          <div className="w-72 fixed sidebar" style={{ background: "#fff" }}>
            <Sidebar />
          </div>
        ) : (
          <div className="w-0">
            <Sidebar />
          </div>
        )}
  
        <div
          className={
            activeMenu
              ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
              : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
          }
        >
          {/* Navbar */}
          <div className="fixed md:static bg-gray-100 navbar w-full">
            <Navbar />
          </div>
  
          {/* Content */}
          <div className="bg-gray-100 w-full">


    <div className="mt-25 mr-3" style={{ paddingBottom: "150px" }}>
      <DashboardInsight />
    </div>

    </div>
        </div>
  
      </div>
  
  );
};

export default Dashboard;

