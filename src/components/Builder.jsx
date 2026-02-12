import { useState } from "react";
import "./Builder.css";
import { IoEyeOutline } from "react-icons/io5";
import { FiSave } from "react-icons/fi";
import { FaPlus, FaRegEyeSlash } from "react-icons/fa6";
import { CiWifiOn, CiCalendar } from "react-icons/ci";
import { TfiText } from "react-icons/tfi";
import { GrTextAlignLeft } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";
import { FiCheckSquare } from "react-icons/fi";
import { MdOutlineFileUpload, MdOutlineEmail } from "react-icons/md";
import { LuHash } from "react-icons/lu";

function Builder() {
  const [isPreview, setIsPreview] = useState(false);
  const [showFieldSelector, setShowFieldSelector] = useState(false);
  const FIELD_TYPES = [
    {
      id: "text",
      title: "Text",
      description: "Single line text input",
      icon: TfiText,
    },
    {
      id: "textarea",
      title: "Text Area",
      description: "Multi-line text",
      icon: GrTextAlignLeft,
    },
    {
      id: "dropdown",
      title: "Dropdown",
      description: "Select from options",
      icon: IoIosArrowDown,
    },
    {
      id: "checkbox",
      title: "Checkbox",
      description: "Yes/No choice",
      icon: FiCheckSquare,
    },
    {
      id: "file",
      title: "File Upload",
      description: "Upload Documents",
      icon: MdOutlineFileUpload,
    },
    {
      id: "date",
      title: "Date Picker",
      description: "Select a date",
      icon: CiCalendar,
    },
    {
      id: "number",
      title: "Number",
      description: "Numeric input ",
      icon: LuHash,
    },
    {
      id: "email",
      title: "Email",
      description: "Email address ",
      icon: MdOutlineEmail,
    },
  ];

  return (
    <div className="page-bg">
      <div className="builder-card">
        <div className="builder-header">
          <h1>{isPreview ? "Form Preview" : "Form Builder"}</h1>
          <div className="builder-actions">
            {!isPreview ? (
              <>
                <button
                  className="preview-btn"
                  onClick={() => setIsPreview(true)}
                >
                  <IoEyeOutline className="icon-inline" /> Preview
                </button>
                <button className="save-btn">
                  <FiSave className="icon-inline" /> Save
                </button>
              </>
            ) : (
              <button
                className="preview-btn"
                onClick={() => setIsPreview(false)}
              >
                <FaRegEyeSlash className="icon-inline" /> Exit Preview
              </button>
            )}
          </div>
        </div>

        {isPreview ? (
          <>
            <div className="thin-separator"></div>
            <div className="preview-header">
              <div>
                <h1 className="preview-title">My Custom Form</h1>
                <p className="preview-desc">
                  A form built with the custom form builder
                </p>
              </div>
              <button className="status-btn">
                <CiWifiOn className="icon-inline" /> Online
              </button>
            </div>
            <button className="submit-preview-btn">Submit (Preview)</button>
          </>
        ) : (
          <>
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

            <div className="thin-separator"></div>

            <div className="fields-section">
              <div className="fields-header">
                <span>Fields (0)</span>
              </div>
              <div className="drag-drop">
                <p className="field-p">No fields added yet</p>
                <button
                  className="field-card"
                  onClick={() => setShowFieldSelector(true)}
                >
                  <FaPlus className="icon-inline" /> Add your first field
                </button>
              </div>

              {showFieldSelector && (
                <div className="field-selector-card">
                  <div className="field-selector-header">
                    <h3>Select Field Type</h3>
                    <button
                      className="cancel-btn"
                      onClick={() => setShowFieldSelector(false)}
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="field-options-grid">
                    {FIELD_TYPES.map((field) => {
                      const Icon = field.icon;
                      return (
                        <div key={field.id} className="field-option">
                          <Icon className="field-option-icon" />
                          <h3>{field.title}</h3>
                          <p>{field.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Builder;
