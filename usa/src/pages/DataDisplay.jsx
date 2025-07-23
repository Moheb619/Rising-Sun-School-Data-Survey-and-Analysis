import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase/supabaseClient";
import { Tab } from "@headlessui/react";

// Helper function to format column names
const formatColumnName = (column) => {
  return column
    .replace(/_/g, " ")
    .replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
};

export default function DataDisplay() {
  const [activeTab, setActiveTab] = useState("students");
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, [activeTab, currentPage]);

  const fetchData = async () => {
    setLoading(true);
    try {
      let tableName, countQuery;

      if (activeTab === "students") {
        tableName = "student_surveys";
      } else if (activeTab === "parents") {
        tableName = "parent_surveys";
      } else {
        tableName = "teacher_surveys";
      }

      // Get total count
      const { count } = await supabase
        .from(tableName)
        .select("*", { count: "exact", head: true });
      setTotalCount(count || 0);

      // Get column names
      const { data: columnsData } = await supabase.rpc("get_table_columns", {
        table_name: tableName,
      });

      setColumns(
        columnsData.map((col) => ({
          name: col.column_name,
          formattedName: formatColumnName(col.column_name),
        }))
      );

      // Get paginated data
      const { data } = await supabase
        .from(tableName)
        .select("*")
        .range(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage - 1
        );

      setTableData(data || []);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage * itemsPerPage < totalCount)
      setCurrentPage(currentPage + 1);
  };

  const formatCellValue = (value, columnName) => {
    if (value === null || value === undefined) return "N/A";

    // Special handling for grade column
    if (columnName === "class") {
      return value; // Return as-is without date parsing
    }

    // Format boolean values
    if (typeof value === "boolean") return value ? "Yes" : "No";

    // Format date values (only for actual date columns)
    if (
      columnName.includes("date") ||
      columnName.includes("time") ||
      columnName.includes("at")
    ) {
      if (typeof value === "string" && !isNaN(Date.parse(value))) {
        return new Date(value).toLocaleString();
      }
    }

    // Format specific string values
    if (typeof value === "string") {
      return value
        .replace(/_/g, " ")
        .replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
    }

    return value;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Survey Data</h1>

      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-4">
          <Tab
            className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
              ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2
              ${
                activeTab === "students"
                  ? "bg-white shadow"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              }`}
            onClick={() => {
              setActiveTab("students");
              setCurrentPage(1);
            }}
          >
            Students
          </Tab>
          <Tab
            className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
              ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2
              ${
                activeTab === "parents"
                  ? "bg-white shadow"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              }`}
            onClick={() => {
              setActiveTab("parents");
              setCurrentPage(1);
            }}
          >
            Parents
          </Tab>
          <Tab
            className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
              ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2
              ${
                activeTab === "teachers"
                  ? "bg-white shadow"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              }`}
            onClick={() => {
              setActiveTab("teachers");
              setCurrentPage(1);
            }}
          >
            Teachers
          </Tab>
        </Tab.List>
      </Tab.Group>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  {columns.map((column) => (
                    <th key={column.name} className="py-3 px-4 text-left">
                      {column.formattedName === "Grade"
                        ? "Class"
                        : column.formattedName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {tableData.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    {columns.map((column) => (
                      <td
                        key={`${row.id}-${column.name}`}
                        className="py-3 px-4"
                      >
                        {formatCellValue(row[column.name], column.name)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {Math.ceil(totalCount / itemsPerPage)}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage * itemsPerPage >= totalCount}
              className={`px-4 py-2 rounded ${
                currentPage * itemsPerPage >= totalCount
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
