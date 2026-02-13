/**
 * Site Map Component
 * Displays all available routes in the application
 */

import Link from "next/link";
import { allPages, getCategories, getPagesByCategory } from "@/lib/routes";

export default function SiteMapPage() {
  const categories = getCategories();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Site Map</h1>
          <p className="mt-2 text-gray-600">
            All available pages in the AfghaniBaba application
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const pages = getPagesByCategory(category);
            
            return (
              <div 
                key={category} 
                className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  {category}
                </h2>
                <ul className="space-y-3">
                  {pages.map((page) => (
                    <li key={page.path}>
                      <Link
                        href={page.path.includes('[id]') ? page.path.replace('[id]', '1') : page.path}
                        className="group flex items-start gap-2 text-sm"
                      >
                        <span className="text-[#FDB713] group-hover:text-[#e6a512] transition">
                          →
                        </span>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 group-hover:text-[#FDB713] transition">
                            {page.name}
                          </p>
                          <p className="text-xs text-gray-500 font-mono">
                            {page.path}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            📊 Statistics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{allPages.length}</p>
              <p className="text-sm text-blue-800">Total Pages</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{categories.length}</p>
              <p className="text-sm text-blue-800">Categories</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">
                {getPagesByCategory("Services").length}
              </p>
              <p className="text-sm text-blue-800">Services</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">
                {getPagesByCategory("Admin").length + getPagesByCategory("Vendor").length}
              </p>
              <p className="text-sm text-blue-800">Dashboard Pages</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 btn-primary"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
