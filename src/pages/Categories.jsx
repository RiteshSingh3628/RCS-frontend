import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import { FaPlus, FaEdit, FaTrash, FaTags, FaSearch } from "react-icons/fa";
import { categories as categoriesApi } from "../api/api";

// Mock categories data
const mockCategories = [
  {
    id: 1,
    name: "Restaurant",
    description: "Food and dining establishments",
    businessCount: 12,
    color: "#FF6B6B",
  },
  {
    id: 2,
    name: "Technology",
    description: "Tech services and repairs",
    businessCount: 8,
    color: "#4ECDC4",
  },
  {
    id: 3,
    name: "Fitness",
    description: "Gyms and fitness centers",
    businessCount: 5,
    color: "#45B7D1",
  },
  {
    id: 4,
    name: "Retail",
    description: "Stores and shopping",
    businessCount: 15,
    color: "#96CEB4",
  },
  {
    id: 5,
    name: "Healthcare",
    description: "Medical and wellness services",
    businessCount: 7,
    color: "#FFEAA7",
  },
  {
    id: 6,
    name: "Education",
    description: "Schools and training centers",
    businessCount: 3,
    color: "#DDA0DD",
  },
];

const Categories = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState(mockCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: "#4F46E5",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await categoriesApi.list();
      console.log("categories in categories page", data);
      setCategories(data.results || data);
    };

    fetchCategories();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Only show active categories
  const filteredCategories = categories
    .filter((category) => category.is_active)
    .filter(
      (category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleAddCategory = () => {
    setFormData({ name: "", description: "", color: "#4F46E5" });
    setEditingCategory(null);
    setShowAddModal(true);
  };

  const handleEditCategory = (category) => {
    setFormData({
      name: category.name,
      description: category.description,
      color: category.color,
    });
    setEditingCategory(category);
    setShowAddModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCategory) {
      // Update existing category
      setCategories(
        categories.map((cat) =>
          cat.id === editingCategory.id ? { ...cat, ...formData } : cat
        )
      );
    } else {
      // Add new category
      const newCategory = {
        id: categories.length + 1,
        ...formData,
        businessCount: 0,
      };
      setCategories([...categories, newCategory]);
    }
    setShowAddModal(false);
    setEditingCategory(null);
    setFormData({ name: "", description: "", color: "#4F46E5" });
  };

  const handleDeleteCategory = (categoryId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this category? This action cannot be undone."
      )
    ) {
      setCategories(categories.filter((cat) => cat.id !== categoryId));
    }
  };

  const CategoryCard = ({ category }) => {
    // Fallbacks for color and businessCount
    const color = category.color || "#4F46E5";
    const businessCount =
      category.businessCount !== undefined ? category.businessCount : 0;
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: color + "20" }}
            >
              <FaTags style={{ color: color }} className="text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {category.name}
              </h3>
              <p className="text-sm text-gray-600">{category.description}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handleEditCategory(category)}
              className="p-2 text-gray-400 hover:text-blue-600"
              title="Edit category"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => handleDeleteCategory(category.id)}
              className="p-2 text-gray-400 hover:text-red-600"
              title="Delete category"
            >
              <FaTrash />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-600">
            {businessCount} business{businessCount !== 1 ? "es" : ""}
          </div>
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: color }}
            title="Category color"
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Navigation onLogout={handleLogout} />
      <div className="flex-1 ml-0 sm:ml-64">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
            <p className="text-gray-600 mt-2">
              Organize your businesses by categories for better management
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="text-2xl font-bold text-gray-900">
                {categories.length}
              </div>
              <div className="text-sm text-gray-600">Total Categories</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="text-2xl font-bold text-blue-600">
                {categories.reduce(
                  (total, cat) => total + cat.businessCount,
                  0
                )}
              </div>
              <div className="text-sm text-gray-600">Total Businesses</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="text-2xl font-bold text-green-600">
                {Math.round(
                  categories.reduce(
                    (total, cat) => total + cat.businessCount,
                    0
                  ) / categories.length
                )}
              </div>
              <div className="text-sm text-gray-600">Avg per Category</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="text-2xl font-bold text-purple-600">
                {categories.find(
                  (cat) =>
                    cat.businessCount ===
                    Math.max(...categories.map((c) => c.businessCount))
                )?.name || "N/A"}
              </div>
              <div className="text-sm text-gray-600">Most Popular</div>
            </div>
          </div>

          {/* Search and Actions Bar */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                onClick={handleAddCategory}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                <FaPlus className="mr-2" />
                Add Category
              </button>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {filteredCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>

          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <FaTags className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <div className="text-gray-500 text-lg">No categories found</div>
              <p className="text-gray-400 mt-2">
                {searchTerm
                  ? "Try adjusting your search criteria"
                  : "Get started by adding your first category"}
              </p>
              {!searchTerm && (
                <button
                  onClick={handleAddCategory}
                  className="mt-4 flex items-center mx-auto px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  <FaPlus className="mr-2" />
                  Add Your First Category
                </button>
              )}
            </div>
          )}

          {/* Usage Distribution */}
          {categories.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Category Distribution
              </h2>
              <div className="space-y-3">
                {categories
                  .sort((a, b) => b.businessCount - a.businessCount)
                  .map((category) => {
                    const total = categories.reduce(
                      (sum, cat) => sum + cat.businessCount,
                      0
                    );
                    const percentage =
                      total > 0 ? (category.businessCount / total) * 100 : 0;

                    return (
                      <div
                        key={category.id}
                        className="flex items-center space-x-3"
                      >
                        <div
                          className="w-4 h-4 rounded-full flex-shrink-0"
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-900">
                              {category.name}
                            </span>
                            <span className="text-sm text-gray-600">
                              {category.businessCount} businesses
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full transition-all duration-300"
                              style={{
                                backgroundColor: category.color,
                                width: `${percentage}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500 min-w-[3rem] text-right">
                          {percentage.toFixed(1)}%
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      </div>

      <AddCategoryModal
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        editingCategory={editingCategory}
        setEditingCategory={setEditingCategory}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

const AddCategoryModal = ({
  showAddModal,
  setShowAddModal,
  editingCategory,
  setEditingCategory,
  formData,
  setFormData,
  handleSubmit,
}) => {
  if (!showAddModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingCategory ? "Edit Category" : "Add New Category"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g., Restaurant, Technology"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Brief description of this category"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Color
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={formData.color}
                  onChange={(e) =>
                    setFormData({ ...formData, color: e.target.value })
                  }
                  className="h-10 w-16 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) =>
                    setFormData({ ...formData, color: e.target.value })
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="#4F46E5"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  setEditingCategory(null);
                  setFormData({ name: "", description: "", color: "#4F46E5" });
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                {editingCategory ? "Update Category" : "Add Category"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Categories;
