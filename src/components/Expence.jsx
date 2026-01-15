import { useState } from "react";
import "./Expence.css";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoTimeOutline } from "react-icons/io5";
import { CiStar, CiForkAndKnife } from "react-icons/ci";
import { MdOutlineTune, MdOutlineTask } from "react-icons/md";
import { LuClipboardList, LuCar } from "react-icons/lu";
import { SlPlane } from "react-icons/sl";
import { FiShoppingBag } from "react-icons/fi";

function Expense() {
  const [amount, setAmount] = useState("");
  const [project, setProject] = useState("");
  const [description, setDescription] = useState("");

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

            <div className="menu-item active">
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

      {/* ================= CARD SECTION ================= */}
      <div className="page-bg">
        <div className="expense-form-card">
          <h2>Expense Type</h2>

          {/* ===== Expense Types ===== */}
          <div className="type-list">
            <div className="type-item active">
              <SlPlane />
              <div>
                <strong>Travel</strong>
                <p>Flights, hotels, transportation</p>
              </div>
            </div>

            <div className="type-item">
              <CiForkAndKnife />
              <div>
                <strong>Meals</strong>
                <p>Business meals & entertainment</p>
              </div>
            </div>

            <div className="type-item">
              <FiShoppingBag />
              <div>
                <strong>Supplies</strong>
                <p>Office & work supplies</p>
              </div>
            </div>

            <div className="type-item">
              <LuCar />
              <div>
                <strong>Mileage</strong>
                <p>Vehicle mileage reimbursement</p>
              </div>
            </div>
          </div>

          {/* ===== Date ===== */}
          <label>Expense Date</label>
          <div className="date-display">Thursday, January 15, 2026</div>

          {/* ===== Amount ===== */}
          <label>Amount</label>
          <div className="amount-box">
            <span>$</span>
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          {/* ===== Project ===== */}
          <label>Project / Cost Center</label>
          <select value={project} onChange={(e) => setProject(e.target.value)}>
            <option value="">Select project</option>
            <option value="project-a">Website Development</option>
            <option value="project-b">Mobile App Development</option>
            <option value="project-b">API Integration</option>
            <option value="project-b">Client Meeting</option>
            <option value="project-b">General Operations</option>
          </select>

          {/* ===== Description ===== */}
          <label>Description</label>
          <textarea
            placeholder="Provide details about this expense..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* ===== Upload ===== */}
          <label>Receipt Upload *</label>
          <div className="upload-area">
            <p>Tap to upload or drag and drop</p>
            <span>Photos of receipts or PDF invoices</span>
          </div>

          {/* ===== Workflow ===== */}
          <label>Approval Workflow</label>
          <div className="workflow">
            <div className="step active">1 Submitted</div>
            <div className="step">2 Manager Review</div>
            <div className="step">3 Finance Approval</div>
            <div className="step">4 Reimbursement</div>
          </div>

          {/* ===== Submit ===== */}
          <button className="submit-expense">Submit Expense Claim</button>
        </div>
      </div>
    </>
  );
}

export default Expense;
