import { useRef, useState } from "react";
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
import { LuHash, LuSettings2 } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaAngleUp } from "react-icons/fa6";
import { LuGripVertical } from "react-icons/lu";
import { FaCheckCircle } from "react-icons/fa";

function Builder() {
  const [isPreview, setIsPreview] = useState(false);
  const [showFieldSelector, setShowFieldSelector] = useState(false);
  const [formFields, setFormFields] = useState([]);
  const [expandedFieldId, setExpandedFieldId] = useState(null);
  const [validationExpanded, setValidationExpanded] = useState({});
  const [requiredMap, setRequiredMap] = useState({});
  const [ruleMenuOpen, setRuleMenuOpen] = useState({});
  const [conditionalExpanded, setConditionalExpanded] = useState({});
  const [conditionalEnabled, setConditionalEnabled] = useState({});
  const [conditionalAction, setConditionalAction] = useState({});
  const [conditionalField, setConditionalField] = useState({});
  const [conditionalCondition, setConditionalCondition] = useState({});
  const [conditionalValue, setConditionalValue] = useState({});
  const [defaultValueMap, setDefaultValueMap] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const toastTimeoutRef = useRef(null);
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
    triggerToast(`${field.title} field added`);
  };

  const handleDeleteField = (id) => {
    setFormFields((prev) => prev.filter((field) => field.id !== id));
    setExpandedFieldId((prev) => (prev === id ? null : prev));
    setValidationExpanded((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setRequiredMap((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setRuleMenuOpen((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setConditionalExpanded((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setConditionalEnabled((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setConditionalAction((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setConditionalField((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setConditionalCondition((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setConditionalValue((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setDefaultValueMap((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    triggerToast("Field removed");
  };

  const handleClearAll = () => {
    setFormFields([]);
    setExpandedFieldId(null);
    setShowFieldSelector(false);
    setValidationExpanded({});
    setRequiredMap({});
    setRuleMenuOpen({});
    setConditionalExpanded({});
    setConditionalEnabled({});
    setConditionalAction({});
    setConditionalField({});
    setConditionalCondition({});
    setConditionalValue({});
    setDefaultValueMap({});
  };

  const handleSave = () => {
    triggerToast("Form save successfully");
  };

  const triggerToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = setTimeout(() => {
      setShowToast(false);
      toastTimeoutRef.current = null;
    }, 2200);
  };

  const totalFields = formFields.length;
  const requiredCount = formFields.filter((field) => requiredMap[field.id]).length;
  const conditionalCount = formFields.filter(
    (field) => conditionalEnabled[field.id],
  ).length;
  const prePopulatedCount = formFields.filter(
    (field) => (defaultValueMap[field.id] || "").trim() !== "",
  ).length;

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
                <button className="save-btn" onClick={handleSave}>
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
                {totalFields > 0 && (
                  <button
                    type="button"
                    className="clear-all-btn"
                    onClick={handleClearAll}
                  >
                    <RiDeleteBinLine />
                    <span>Clear All</span>
                  </button>
                )}
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
                              value={defaultValueMap[field.id] || ""}
                              onChange={(e) =>
                                setDefaultValueMap((prev) => ({
                                  ...prev,
                                  [field.id]: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div className="field-input-stack">
                            <label>Field Width</label>
                            <select className="field-input field-select">
                              <option>Full Width</option>
                              <option>Half Width</option>
                            </select>
                          </div>

                          <div className="validation-header">
                            <span className="section-header-label">
                              <LuSettings2 />
                              Validation Rules (
                              {requiredMap[field.id] ? 1 : 0})
                            </span>
                            <button
                              type="button"
                              className="field-action-btn"
                              onClick={() =>
                                setValidationExpanded((prev) => ({
                                  ...prev,
                                  [field.id]: !prev[field.id],
                                }))
                              }
                            >
                              <IoIosArrowDown />
                            </button>
                          </div>

                          {validationExpanded[field.id] && (
                            <div className="validation-body">
                              <div className="validation-row">
                                <span>Required Field</span>
                                <label className="switch">
                                  <input
                                    type="checkbox"
                                    checked={!!requiredMap[field.id]}
                                    onChange={(e) =>
                                      setRequiredMap((prev) => ({
                                        ...prev,
                                        [field.id]: e.target.checked,
                                      }))
                                    }
                                  />
                                  <span className="slider" />
                                </label>
                              </div>

                              <div className="validation-add">
                                <span>Add Validation rule...</span>
                                <button
                                  type="button"
                                  className="field-action-btn"
                                  onClick={() =>
                                    setRuleMenuOpen((prev) => ({
                                      ...prev,
                                      [field.id]: !prev[field.id],
                                    }))
                                  }
                                >
                                  <IoIosArrowDown />
                                </button>
                              </div>

                              {ruleMenuOpen[field.id] && (
                                <div className="validation-menu">
                                  <div className="validation-option">
                                    Min Length
                                  </div>
                                  <div className="validation-option">
                                    Max Length
                                  </div>
                                  <div className="validation-option">
                                    Pattern (Regex)
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          <div className="conditional-header">
                            <span className="section-header-label">
                              <LuSettings2 />
                              Conditional Logic
                            </span>
                            <button
                              type="button"
                              className="field-action-btn"
                              onClick={() =>
                                setConditionalExpanded((prev) => ({
                                  ...prev,
                                  [field.id]: !prev[field.id],
                                }))
                              }
                            >
                              <IoIosArrowDown />
                            </button>
                          </div>

                          {conditionalExpanded[field.id] && (
                            <div className="conditional-body">
                              <div className="conditional-row">
                                <span>Enable Conditional Logic</span>
                                <label className="switch">
                                  <input
                                    type="checkbox"
                                    checked={!!conditionalEnabled[field.id]}
                                    onChange={(e) =>
                                      setConditionalEnabled((prev) => ({
                                        ...prev,
                                        [field.id]: e.target.checked,
                                      }))
                                    }
                                  />
                                  <span className="slider" />
                                </label>
                              </div>

                              {conditionalEnabled[field.id] && (
                                <div className="conditional-config-card">
                                  <div className="field-input-stack">
                                    <label>Action</label>
                                    <select
                                      className="field-input field-select"
                                      value={
                                        conditionalAction[field.id] ||
                                        "show-this-field"
                                      }
                                      onChange={(e) =>
                                        setConditionalAction((prev) => ({
                                          ...prev,
                                          [field.id]: e.target.value,
                                        }))
                                      }
                                    >
                                      <option value="show-this-field">
                                        Show this field
                                      </option>
                                      <option value="hide-this-field">
                                        Hide this field
                                      </option>
                                    </select>
                                  </div>

                                  <p className="conditional-helper">When...</p>

                                  <div className="field-input-stack">
                                    <label>Field</label>
                                    <select
                                      className="field-input field-select"
                                      value={conditionalField[field.id] || ""}
                                      onChange={(e) =>
                                        setConditionalField((prev) => ({
                                          ...prev,
                                          [field.id]: e.target.value,
                                        }))
                                      }
                                    >
                                      <option value="">Select field</option>
                                      <option value="text">Text Field</option>
                                      <option value="email">Email Field</option>
                                      <option value="number">Number Field</option>
                                    </select>
                                  </div>

                                  <div className="field-input-stack">
                                    <label>Condition</label>
                                    <select
                                      className="field-input field-select"
                                      value={conditionalCondition[field.id] || ""}
                                      onChange={(e) =>
                                        setConditionalCondition((prev) => ({
                                          ...prev,
                                          [field.id]: e.target.value,
                                        }))
                                      }
                                    >
                                      <option value="">Select condition</option>
                                      <option value="equals">Equals</option>
                                      <option value="not-equals">
                                        Does not equal
                                      </option>
                                      <option value="contains">Contains</option>
                                      <option value="is-empty">Is empty</option>
                                      <option value="is-not-empty">
                                        Is not empty
                                      </option>
                                    </select>
                                  </div>

                                  <div className="field-input-stack">
                                    <label>Value</label>
                                    <input
                                      type="text"
                                      className="field-input"
                                      placeholder="Comparison value"
                                      value={conditionalValue[field.id] || ""}
                                      onChange={(e) =>
                                        setConditionalValue((prev) => ({
                                          ...prev,
                                          [field.id]: e.target.value,
                                        }))
                                      }
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
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

                  <div className="builder-summary-card">
                    <span>
                      <span className="summary-value">{totalFields}</span> fields
                    </span>
                    <span className="summary-dot">•</span>
                    <span>
                      <span className="summary-value">{requiredCount}</span>{" "}
                      required
                    </span>
                    <span className="summary-dot">•</span>
                    <span>
                      <span className="summary-value">{conditionalCount}</span>{" "}
                      with conditional logic
                    </span>
                    <span className="summary-dot">•</span>
                    <span>
                      <span className="summary-value">{prePopulatedCount}</span>{" "}
                      pre-populated
                    </span>
                  </div>

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

      {totalFields > 0 && (
        <p className="builder-help-line">
          Drag fields to reorder <span className="summary-dot">•</span> Click to
          expand and edit settings
        </p>
      )}

      {showToast && (
        <div className="save-toast">
          <FaCheckCircle />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default Builder;
