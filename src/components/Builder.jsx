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
import { RiDeleteBinLine } from "react-icons/ri";
import { FaAngleUp } from "react-icons/fa6";
import { LuGripVertical } from "react-icons/lu";

function Builder() {
  const [isPreview, setIsPreview] = useState(false);
  const [showFieldSelector, setShowFieldSelector] = useState(false);
  const [formFields, setFormFields] = useState([]);
  const [expandedFieldId, setExpandedFieldId] = useState(null);
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

  const handleFieldTypeSelect = (field) => {
    setFormFields((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        label: `New ${field.title} Field`,
        typeLabel: field.title,
      },
    ]);
    setShowFieldSelector(false);
  };

  const handleDeleteField = (id) => {
    setFormFields((prev) => prev.filter((field) => field.id !== id));
    setExpandedFieldId((prev) => (prev === id ? null : prev));
  };

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
                <input type="text" placeholder="Enter form name" />
              </div>
              <div className="form-desc">
                <label>Form Description</label>
                <input type="text" placeholder="Brief Description" />
              </div>
            </div>

            <div className="thin-separator"></div>

            <div className="fields-section">
              <div className="fields-header">
                <span>Fields ({formFields.length})</span>
              </div>

              {formFields.length === 0 ? (
                <div className="drag-drop">
                  <p className="field-p">No fields added yet</p>
                  <button
                    className="field-card"
                    onClick={() => setShowFieldSelector(true)}
                  >
                    <FaPlus className="icon-inline" /> Add your first field
                  </button>
                </div>
              ) : (
                <>
                  {formFields.map((field) => (
                    <div key={field.id} className="added-field-card">
                      <div className="added-field-header">
                        <div className="added-field-left">
                          <h4 className="added-field-title">
                            <LuGripVertical />
                            {field.label}
                          </h4>
                          <p>{field.typeLabel}</p>
                        </div>
                        <div className="added-field-actions">
                          <button
                            type="button"
                            className="field-action-btn"
                            onClick={() =>
                              setExpandedFieldId((prev) =>
                                prev === field.id ? null : field.id,
                              )
                            }
                          >
                            {expandedFieldId === field.id ? (
                              <FaAngleUp />
                            ) : (
                              <IoIosArrowDown />
                            )}
                          </button>
                          <button
                            type="button"
                            className="field-action-btn delete"
                            onClick={() => handleDeleteField(field.id)}
                          >
                            <RiDeleteBinLine />
                          </button>
                        </div>
                      </div>

                      {expandedFieldId === field.id && (
                        <div className="added-field-body">
                          <div className="added-field-divider" />
                          <div className="field-input-grid">
                            <div>
                              <label>Label</label>
                              <input
                                type="text"
                                placeholder="Field label"
                                className="field-input"
                              />
                            </div>
                            <div>
                              <label>Placeholder</label>
                              <input
                                type="text"
                                placeholder="Placeholder text"
                                className="field-input"
                              />
                            </div>
                          </div>
                          <div className="field-input-stack">
                            <label>Help Text</label>
                            <input
                              type="text"
                              placeholder="Additional instructions for users"
                              className="field-input"
                            />
                          </div>
                          <div className="field-input-stack">
                            <label>Default Value (Pre-populated)</label>
                            <input
                              type="text"
                              placeholder="Default value"
                              className="field-input"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  <button
                    type="button"
                    className="add-field-trigger"
                    onClick={() => setShowFieldSelector(true)}
                  >
                    Add Field
                  </button>
                </>
              )}

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
                        <div
                          key={field.id}
                          className="field-option"
                          onClick={() => handleFieldTypeSelect(field)}
                        >
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
