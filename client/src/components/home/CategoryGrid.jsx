import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: 1,
    title: "Electricity Issues",
    icon: "⚡",
    color: "bg-yellow-100",
    textColor: "text-yellow-700",
    category: "electricity",
  },
  {
    id: 2,
    title: "Plumbing Issues",
    icon: "🚰",
    color: "bg-sky-100",
    textColor: "text-sky-700",
    category: "plumbing",
  },
  {
    id: 3,
    title: "Road Problems",
    icon: "🛣️",
    color: "bg-orange-100",
    textColor: "text-orange-700",
    category: "road",
  },
  {
    id: 4,
    title: "Cleaning Services",
    icon: "🧹",
    color: "bg-green-100",
    textColor: "text-green-700",
    category: "cleaning",
  },
  {
    id: 5,
    title: "Other Issues",
    icon: "📍",
    color: "bg-gray-100",
    textColor: "text-gray-700",
    category: "other",
  },
];

const CategoryGrid = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (selectedCategory) => {
    navigate(`/report?category=${selectedCategory}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {categories.map((item) => (
        <button
          key={item.id}
          onClick={() => handleCategoryClick(item.category)}
          className={`${item.color} rounded-3xl p-6 text-left shadow-sm hover:shadow-md transition duration-300`}
        >
          <div className="text-4xl">{item.icon}</div>
          <h3 className={`mt-4 text-xl font-bold ${item.textColor}`}>
            {item.title}
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            Tap here to report this problem
          </p>
        </button>
      ))}
    </div>
  );
};

export default CategoryGrid;