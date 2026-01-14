import { useState } from "react";
import "./Expence.css";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoTimeOutline } from "react-icons/io5";
import { CiStar } from "react-icons/ci";
import { MdOutlineTune, MdOutlineTask } from "react-icons/md";
import { LuClipboardList } from "react-icons/lu";

function Expense() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.amount) return;

    setExpenses((prev) => [
      ...prev,
      { ...form, id: Date.now(), amount: Number(form.amount) },
    ]);

    setForm({ title: "", amount: "", category: "", date: "" });
  };

  return (
    <>
      {/* ================= MAIN FIXED NAV ================= */}
      <nav className="main-nav">
        <div className="nav-container">
          <div className="nav-left">
            <div className="icon-badge">
              <RiMoneyDollarBoxLine />
            </div>
            <div>
              <h2>Expense Claim</h2>
              <p>Submit Reimbursements</p>
            </div>
          </div>

          <div className="nav-right">
            <span className="bell">
              <IoMdNotificationsOutline />
            </span>
          </div>
        </div>
      </nav>

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

            <div className="menu-item">
              <RiMoneyDollarBoxLine />
              <span>Expense</span>
            </div>

            <div className="menu-item">
              <CiStar />
              <span>Review</span>
            </div>

            <div className="menu-item">
              <MdOutlineTune />
              <span>Builder</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Expense;
