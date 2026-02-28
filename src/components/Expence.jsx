import { useRef, useState } from "react";
import "./Expence.css";
import { CiForkAndKnife } from "react-icons/ci";
import { LuCar, LuPlane, LuUpload } from "react-icons/lu";
import { SlPlane } from "react-icons/sl";
import { FiShoppingBag, FiPaperclip, FiX } from "react-icons/fi";
import { PiTelegramLogoLight } from "react-icons/pi";
import { IoLocationOutline, IoTimeOutline } from "react-icons/io5";
import { BsPeople } from "react-icons/bs";

function Expense() {
  const [expenseType, setExpenseType] = useState("");
  const [amount, setAmount] = useState("");
  const [project, setProject] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [travelPurpose, setTravelPurpose] = useState("");
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [travelDays, setTravelDays] = useState("");
  const [mealType, setMealType] = useState("");
  const [attendees, setAttendees] = useState("");
  const [mealBusinessPurpose, setMealBusinessPurpose] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [distanceMiles, setDistanceMiles] = useState("");

  const today = new Date().toISOString().split("T")[0];
  const dateInputRef = useRef(null);
  const mileageRate = 0.67;
  const mileageTotal = (Number.parseFloat(distanceMiles) || 0) * mileageRate;
  const toggleExpenseType = (type) => {
    setExpenseType((prevType) => (prevType === type ? "" : type));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / 1024).toFixed(2),
      file,
    }));
    setUploadedFiles([...uploadedFiles, ...newFiles]);
  };

  const removeFile = (id) => {
    setUploadedFiles(uploadedFiles.filter((file) => file.id !== id));
  };

  const formatDateDisplay = (dateString) => {
    if (!dateString) return "Select expense date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <div className="page-bg">
        <div className="expense-form-card">
          <h2>Expense Type</h2>

          <div className="type-list">
            <div
              className={`type-item ${expenseType === "travel" ? "active" : ""}`}
              onClick={() => toggleExpenseType("travel")}
            >
              <SlPlane />
              <div>
                <strong>Travel</strong>
                <p>Flights, hotels, transportation</p>
              </div>
            </div>
            <div
              className={`type-item ${expenseType === "meals" ? "active" : ""}`}
              onClick={() => toggleExpenseType("meals")}
            >
              <CiForkAndKnife />
              <div>
                <strong>Meals</strong>
                <p>Business meals & entertainment</p>
              </div>
            </div>
            <div
              className={`type-item ${expenseType === "supplies" ? "active" : ""}`}
              onClick={() => toggleExpenseType("supplies")}
            >
              <FiShoppingBag />
              <div>
                <strong>Supplies</strong>
                <p>Office & work supplies</p>
              </div>
            </div>
            <div
              className={`type-item ${expenseType === "mileage" ? "active" : ""}`}
              onClick={() => toggleExpenseType("mileage")}
            >
              <LuCar />
              <div>
                <strong>Mileage</strong>
                <p>Vehicle mileage reimbursement</p>
              </div>
            </div>
          </div>

          <label>Expense Date</label>
          <div className="date-input-container">
            <div
              className="date-display dropdown"
              onClick={() => {
                if (!dateInputRef.current) return;
                if (typeof dateInputRef.current.showPicker === "function") {
                  dateInputRef.current.showPicker();
                } else {
                  dateInputRef.current.focus();
                  dateInputRef.current.click();
                }
              }}
            >
              {formatDateDisplay(selectedDate)}
            </div>
            <input
              ref={dateInputRef}
              type="date"
              className="date-picker"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              max={today}
            />
          </div>

          {expenseType === "travel" && (
            <div className="travel-details-card">
              <div className="travel-details-title">
                <LuPlane />
                <h3>Travel Details</h3>
              </div>

              <label>Travel Purpose</label>
              <select
                value={travelPurpose}
                onChange={(e) => setTravelPurpose(e.target.value)}
              >
                <option value="">Select purpose</option>
                <option value="client-meeting">Client meeting</option>
                <option value="conference-training">Conference/Training</option>
                <option value="site-visit">Site visit</option>
                <option value="other">Other</option>
              </select>

              <div className="travel-locations">
                <div>
                  <label>From</label>
                  <div className="location-input">
                    <IoLocationOutline />
                    <input
                      type="text"
                      placeholder="City"
                      value={fromCity}
                      onChange={(e) => setFromCity(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label>To</label>
                  <div className="location-input">
                    <IoLocationOutline />
                    <input
                      type="text"
                      placeholder="City"
                      value={toCity}
                      onChange={(e) => setToCity(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <label>Number of Days</label>
              <div className="days-input">
                <IoTimeOutline />
                <input
                  type="number"
                  min="1"
                  placeholder="Number of days"
                  value={travelDays}
                  onChange={(e) => setTravelDays(e.target.value)}
                />
              </div>
            </div>
          )}

          {expenseType === "meals" && (
            <div className="meal-details-card">
              <div className="meal-details-title">
                <CiForkAndKnife />
                <h3>Meal Details</h3>
              </div>

              <label>Meal Type</label>
              <div className="meal-type-options">
                <button
                  type="button"
                  className={`meal-type-btn ${mealType === "breakfast" ? "active" : ""}`}
                  onClick={() => setMealType("breakfast")}
                >
                  Breakfast
                </button>
                <button
                  type="button"
                  className={`meal-type-btn ${mealType === "lunch" ? "active" : ""}`}
                  onClick={() => setMealType("lunch")}
                >
                  Lunch
                </button>
                <button
                  type="button"
                  className={`meal-type-btn ${mealType === "dinner" ? "active" : ""}`}
                  onClick={() => setMealType("dinner")}
                >
                  Dinner
                </button>
                <button
                  type="button"
                  className={`meal-type-btn ${mealType === "client-entertainment" ? "active" : ""}`}
                  onClick={() => setMealType("client-entertainment")}
                >
                  Client Entertainment
                </button>
              </div>

              <label>Attendees</label>
              <div className="attendees-input">
                <BsPeople />
                <input
                  type="text"
                  placeholder="Names of attendees"
                  value={attendees}
                  onChange={(e) => setAttendees(e.target.value)}
                />
              </div>

              <label>Business Purpose</label>
              <textarea
                placeholder="Describe the business purpose of this meal"
                value={mealBusinessPurpose}
                onChange={(e) => setMealBusinessPurpose(e.target.value)}
                rows="4"
              />
            </div>
          )}

          {expenseType === "mileage" && (
            <div className="mileage-details-card">
              <div className="mileage-details-title">
                <LuCar />
                <h3>Mileage Details</h3>
              </div>

              <div className="mileage-locations">
                <div>
                  <label>Start Location</label>
                  <div className="location-input">
                    <IoLocationOutline />
                    <input
                      type="text"
                      placeholder="From"
                      value={startLocation}
                      onChange={(e) => setStartLocation(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label>End Location</label>
                  <div className="location-input">
                    <IoLocationOutline />
                    <input
                      type="text"
                      placeholder="To"
                      value={endLocation}
                      onChange={(e) => setEndLocation(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <label>Distance (miles)</label>
              <input
                type="number"
                min="0"
                step="0.1"
                placeholder="0.0"
                value={distanceMiles}
                onChange={(e) => setDistanceMiles(e.target.value)}
              />

              <div className="mileage-summary-field">
                <span className="mileage-rate-text">Rate: $0.67/mile</span>
                <span className="mileage-total">${mileageTotal.toFixed(2)}</span>
              </div>
            </div>
          )}

          {expenseType !== "mileage" && (
            <>
              <label>Amount</label>
              <div className="amount-box">
                <span>$</span>
                <input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  step="0.01"
                  min="0"
                />
              </div>
            </>
          )}

          <label>Project / Cost Center</label>
          <select value={project} onChange={(e) => setProject(e.target.value)}>
            <option value="">Select project</option>
            <option value="a">Website Development</option>
            <option value="b">Mobile App Development</option>
            <option value="c">API Integration</option>
            <option value="d">Client Meeting</option>
            <option value="e">General Operations</option>
          </select>

          <label>Description</label>
          <textarea
            placeholder="Provide details about this expense..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
          />

          <label>Receipt Upload</label>

          <label className="upload-area">
            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={handleFileUpload}
            />
            <LuUpload className="upload-icon" />
            <p className="upload-line">
              <span style={{ color: "#2c9a89", fontWeight: 650 }}>
                Tap to upload
              </span>{" "}
              or drag and drop
            </p>{" "}
            <span className="upload-hint">
              Photos of receipts or PDF invoices
            </span>
          </label>

          {uploadedFiles.length > 0 && (
            <div className="uploaded-files">
              <h4>Uploaded Files ({uploadedFiles.length})</h4>
              {uploadedFiles.map((file) => (
                <div key={file.id} className="file-item">
                  <div className="file-info">
                    <FiPaperclip />
                    <div>
                      <strong>{file.name}</strong>
                      <span>{file.size} KB</span>
                    </div>
                  </div>
                  <button
                    className="remove-file-btn"
                    onClick={() => removeFile(file.id)}
                    type="button"
                  >
                    <FiX />
                  </button>
                </div>
              ))}
            </div>
          )}

          <label>Approval Workflow</label>
          <div className="workflow">
            <div className="workflow-step active">
              <span className="step-circle">1</span>
              <span className="step-label">Submitted</span>
            </div>
            <div className="workflow-step">
              <span className="step-circle">2</span>
              <span className="step-label">Manager Review</span>
            </div>
            <div className="workflow-step">
              <span className="step-circle">3</span>
              <span className="step-label">Finance Approval</span>
            </div>
            <div className="workflow-step">
              <span className="step-circle">4</span>
              <span className="step-label">Reimbursement</span>
            </div>
          </div>

          <button className="submit-expense">
            <PiTelegramLogoLight className="send-icon" />
            <span>Submit Expense Claim</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Expense;
