import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentForm from "./pages/StudentForm";
import ParentForm from "./pages/ParentForm";
import TeacherForm from "./pages/TeacherForm";
import FormNavigation from "./components/FormNavigation";
import DataDisplay from "./pages/DataDisplay";
import AnalysisDashboard from "./pages/AnalysisDashboard";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 p-4">
        <FormNavigation />
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <Routes>
            <Route path="/" element={<StudentForm />} />
            <Route path="/student" element={<StudentForm />} />
            <Route path="/parent" element={<ParentForm />} />
            <Route path="/teacher" element={<TeacherForm />} />
            <Route path="/data" element={<DataDisplay />} />
            <Route path="/analysis" element={<AnalysisDashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
