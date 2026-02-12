import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoTimeOutline } from "react-icons/io5";
import { CiStar } from "react-icons/ci";
import { MdOutlineTask } from "react-icons/md";
import { LuClipboardList, LuSettings2 } from "react-icons/lu";
import { NavLink, Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      {/* ================= MAIN NAV ================= */}
      <nav className="main-nav">
        <div className="nav-container">
          <div className="nav-left">
            <div className="icon-badge">
              <RiMoneyDollarBoxLine />
            </div>
            <div>
              <h2>Expense Claim</h2>
              <p>Manage Your Forms</p>
            </div>
          </div>

          <div className="nav-right">
            <span className="bell">
              <IoMdNotificationsOutline />
            </span>
          </div>
        </div>
      </nav>

      {/* ================= SUB NAV ================= */}
      <div className="sub-nav">
        <div className="nav-container">
          <div className="menu">
            <div className="menu-item">
              <MdOutlineTask />
              <span>Submissions</span>
            </div>
            <div className="menu-item">
              <IoTimeOutline />
              <span>Timesheet</span>
            </div>
            <div className="menu-item">
              <LuClipboardList />
              <span>Task</span>
            </div>

            <NavLink
              to="/expense"
              className={({ isActive }) =>
                isActive ? "menu-item active" : "menu-item"
              }
            >
              <RiMoneyDollarBoxLine />
              <span>Expense</span>
            </NavLink>

            <div className="menu-item">
              <CiStar />
              <span>Review</span>
            </div>

            <NavLink
              to="/builder"
              className={({ isActive }) =>
                isActive ? "menu-item active" : "menu-item"
              }
            >
              <LuSettings2 />
              <span>Builder</span>
            </NavLink>
          </div>
        </div>
      </div>

      {/* ================= PAGE CONTENT ================= */}
      <div className="page-bg">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
