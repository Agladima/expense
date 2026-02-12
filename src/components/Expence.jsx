import { useRef, useState } from "react";
import "./Expence.css";
import { CiForkAndKnife } from "react-icons/ci";
import { LuCar, LuUpload } from "react-icons/lu";
import { SlPlane } from "react-icons/sl";
import { FiShoppingBag, FiPaperclip, FiX } from "react-icons/fi";
import { PiTelegramLogoLight } from "react-icons/pi";

function Expense() {
  const [amount, setAmount] = useState("");
  const [project, setProject] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const today = new Date().toISOString().split("T")[0];
  const dateInputRef = useRef(null);

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

          <label>Expense Date</label>
          <div className="date-input-container">
            <div
              className="date-display dropdown"
              onClick={() => dateInputRef.current.showPicker()}
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

          <label>
            Receipt Upload <span className="required">*</span>
          </label>

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
