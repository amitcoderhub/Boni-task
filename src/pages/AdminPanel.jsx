import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminPanel = ({ onPageCreate }) => {
  const [formData, setFormData] = useState({
    slug: "",
    components: [],
  });
  const [message, setMessage] = useState("");

  const componentTypes = [
    { value: "TextSection", label: "Text Section", icon: "📝" },
    { value: "ImageBlock", label: "Image Block", icon: "🖼️" },
    { value: "Card", label: "Card", icon: "🃏" },
    { value: "StatsBox", label: "Stats Box", icon: "📊" },
    { value: "CTA", label: "Call to Action", icon: "🎯" },
  ];

  const addComponent = (type) => {
    const defaultProps = {
      TextSection: {
        title: "New Section",
        content: "Enter your content here",
        variant: "default",
      },
      ImageBlock: {
        src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop",
        alt: "Sample image",
        caption: "Image caption",
      },
      Card: {
        title: "Card Title",
        content: "Card content goes here",
        variant: "default",
      },
      StatsBox: { stats: [{ label: "Statistic", value: "100" }] },
      CTA: {
        title: "Call to Action",
        description: "Description text",
        buttonText: "Click Me",
        buttonLink: "#",
        variant: "primary",
      },
    };

    setFormData((prev) => ({
      ...prev,
      components: [...prev.components, { type, props: defaultProps[type] }],
    }));
  };

  const removeComponent = (index) => {
    setFormData((prev) => ({
      ...prev,
      components: prev.components.filter((_, i) => i !== index),
    }));
  };

  const updateComponent = (index, newProps) => {
    setFormData((prev) => ({
      ...prev,
      components: prev.components.map((comp, i) =>
        i === index ? { ...comp, props: newProps } : comp
      ),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.slug.trim()) {
      setMessage("Please enter a page slug");
      return;
    }
    if (formData.components.length === 0) {
      setMessage("Please add at least one component");
      return;
    }

    const result = onPageCreate(formData);
    setMessage(result.message);

    if (result.success) {
      setFormData({ slug: "", components: [] });
    }
  };

  const handleCreatePage = async () => {
    try {
      const response = await fetch("/api/pages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage(`Success: ${result.message}`);
        setFormData({ slug: "", components: [] });
      } else {
        // Fallback to local storage if API is not available
        const result = onPageCreate(formData);
        setMessage(result.message);
        if (result.success) {
          setFormData({ slug: "", components: [] });
        }
      }
    } catch (error) {
      // Fallback to local storage if API is not available
      const result = onPageCreate(formData);
      setMessage(result.message);
      if (result.success) {
        setFormData({ slug: "", components: [] });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-10">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 font-semibold transition-colors group"
            >
              <span className="transform group-hover:-translate-x-1 transition-transform">
                ←
              </span>
              <span>Back to Home</span>
            </Link>
            <div className="hidden sm:flex items-center space-x-4">
              <div className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                Admin Panel
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="w-full max-w-none">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Create New Page
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Build beautiful, dynamic pages with our drag-and-drop component
              system
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Page Settings Section */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 lg:p-8 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">⚙️</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Page Settings
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="lg:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Page Slug (URL path)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          slug: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 border-2 text-black border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-lg"
                      placeholder="e.g., about-us, contact, services"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                      <span className="text-gray-400">🔗</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2 flex items-center space-x-2">
                    <span>📍</span>
                    <span>
                      Page will be available at:{" "}
                      <code className="bg-gray-100 px-2 py-1 rounded">
                        /{formData.slug || "your-slug"}
                      </code>
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Components Section */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 lg:p-8 hover:shadow-2xl transition-all duration-300">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 space-y-4 lg:space-y-0">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">🧩</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Page Components
                  </h2>
                </div>

                {/* Component Buttons */}
                <div className="flex flex-wrap gap-3">
                  {componentTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => addComponent(type.value)}
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:from-indigo-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
                    >
                      <span>{type.icon}</span>
                      <span className="hidden sm:inline">+ {type.label}</span>
                      <span className="sm:hidden">+</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Empty State */}
              {formData.components.length === 0 && (
                <div className="text-center py-16 px-4">
                  <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">📦</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No components yet
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Start building your page by adding components using the
                    buttons above. Mix and match different elements to create
                    the perfect layout.
                  </p>
                </div>
              )}

              {/* Components List */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {formData.components.map((component, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl border-2 border-gray-100 hover:border-indigo-200 p-6 transition-all duration-200 hover:shadow-lg"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">
                          {
                            componentTypes.find(
                              (t) => t.value === component.type
                            )?.icon
                          }
                        </span>
                        <h3 className="font-bold text-gray-900 text-lg">
                          {component.type}
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeComponent(index)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove component"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    <ComponentEditor
                      type={component.type}
                      props={component.props}
                      onChange={(newProps) => updateComponent(index, newProps)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Section */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <button
                  type="button"
                  onClick={handleCreatePage}
                  className="flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
                >
                  <span>🚀</span>
                  <span>Create Page</span>
                </button>

                {message && (
                  <div
                    className={`px-6 py-3 rounded-xl font-medium flex items-center space-x-2 ${
                      message.includes("Success")
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : "bg-red-100 text-red-700 border border-red-200"
                    }`}
                  >
                    <span>{message.includes("Success") ? "✅" : "⚠️"}</span>
                    <span>{message}</span>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const ComponentEditor = ({ type, props, onChange }) => {
  const updateProp = (key, value) => {
    onChange({ ...props, [key]: value });
  };

  const inputClasses =
    "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all";
  const textareaClasses =
    "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none";
  const selectClasses =
    "px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white";

  switch (type) {
    case "TextSection":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={props.title || ""}
              onChange={(e) => updateProp("title", e.target.value)}
              placeholder="Enter section title"
              className={`${inputClasses} text-black`}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Content
            </label>
            <textarea
              value={props.content || ""}
              onChange={(e) => updateProp("content", e.target.value)}
              placeholder="Enter your content here"
              rows={4}
              className={`${textareaClasses} text-black`}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Style Variant
            </label>
            <select
              value={props.variant || "default"}
              onChange={(e) => updateProp("variant", e.target.value)}
              className={`${selectClasses} text-black`}
            >
              <option value="default">Default</option>
              <option value="large">Large</option>
              <option value="centered">Centered</option>
            </select>
          </div>
        </div>
      );

    case "ImageBlock":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="url"
              value={props.src || ""}
              onChange={(e) => updateProp("src", e.target.value)}
              placeholder="https://example.com/image.jpg"
              className={`${inputClasses} text-black`}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Alt Text
            </label>
            <input
              type="text"
              value={props.alt || ""}
              onChange={(e) => updateProp("alt", e.target.value)}
              placeholder="Describe the image for accessibility"
              className={`${inputClasses} text-black`}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Caption (Optional)
            </label>
            <input
              type="text"
              value={props.caption || ""}
              onChange={(e) => updateProp("caption", e.target.value)}
              placeholder="Image caption or description"
              className={`${inputClasses} text-black`}
            />
          </div>
        </div>
      );

    case "Card":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Card Title
            </label>
            <input
              type="text"
              value={props.title || ""}
              onChange={(e) => updateProp("title", e.target.value)}
              placeholder="Enter card title"
              className={`${inputClasses} text-black`}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Card Content
            </label>
            <textarea
              value={props.content || ""}
              onChange={(e) => updateProp("content", e.target.value)}
              placeholder="Enter card content"
              rows={3}
              className={`${textareaClasses} text-black`}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Image URL (Optional)
            </label>
            <input
              type="url"
              value={props.image || ""}
              onChange={(e) => updateProp("image", e.target.value)}
              placeholder="https://example.com/image.jpg"
              className={`${inputClasses} text-black`}
            />
          </div>
        </div>
      );

    case "CTA":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              CTA Title
            </label>
            <input
              type="text"
              value={props.title || ""}
              onChange={(e) => updateProp("title", e.target.value)}
              placeholder="Enter call-to-action title"
              className={inputClasses}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={props.description || ""}
              onChange={(e) => updateProp("description", e.target.value)}
              placeholder="Describe the action you want users to take"
              rows={3}
              className={textareaClasses}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Button Text
              </label>
              <input
                type="text"
                value={props.buttonText || ""}
                onChange={(e) => updateProp("buttonText", e.target.value)}
                placeholder="Click Me"
                className={inputClasses}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Button Link
              </label>
              <input
                type="text"
                value={props.buttonLink || ""}
                onChange={(e) => updateProp("buttonLink", e.target.value)}
                placeholder="https://example.com or #section"
                className={inputClasses}
              />
            </div>
          </div>
        </div>
      );

    case "StatsBox":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Statistics (JSON format)
            </label>
            <textarea
              value={JSON.stringify(props.stats, null, 2)}
              onChange={(e) => {
                try {
                  const stats = JSON.parse(e.target.value);
                  updateProp("stats", stats);
                } catch (err) {
                  // Invalid JSON, keep the current value
                }
              }}
              placeholder='[{"label": "Users", "value": "10,000"}, {"label": "Projects", "value": "500"}]'
              rows={6}
              className={`${textareaClasses} font-mono text-sm`}
            />
            <p className="text-xs text-gray-500 mt-2">
              💡 Tip: Each stat should have a "label" and "value" property
            </p>
          </div>
        </div>
      );

    default:
      return <div className="text-gray-500 italic">Unknown component type</div>;
  }
};

export default AdminPanel;
