import "./Builder.css";
import { IoEyeOutline } from "react-icons/io5";
import { FiSave } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";

function Builder() {
  return (
    <div className="page-bg">
      <div className="builder-card">
        {/* ================= HEADER ================= */}
        <div className="builder-header">
          <h1>Form Builder</h1>
          <div className="builder-actions">
            <button className="preview-btn">
              <IoEyeOutline className="icon-inline" /> Preview
            </button>
            <button className="save-btn">
              <FiSave className="icon-inline" /> Save
            </button>
          </div>
        </div>

        {/* ================= FORM NAME & DESCRIPTION ================= */}
        <div className="form-meta">
          <div className="form-name">
            <label>Form Name</label>
            <input type="text" placeholder="My Custom Form" />
          </div>
          <div className="form-desc">
            <label>Form Description</label>
            <input
              type="text"
              placeholder="A form built with the custom form builder"
            />
          </div>
        </div>

        {/* ================= THIN SEPARATOR ================= */}
        <div className="thin-separator"></div>

        {/* ================= FIELDS SECTION ================= */}
        <div className="fields-section">
          <div className="fields-header">
            <span>Fields (0)</span>
          </div>

          {/* Drag & drop area */}
          <div className="drag-drop">
            <p className="field-p">No fields added yet</p>
            <button className="field-card">
              <FaPlus className="icon-inline" /> Add your first field
            </button>{" "}
          </div>

          {/* Add your first field button */}
        </div>
      </div>
    </div>
  );
}

export default Builder;
