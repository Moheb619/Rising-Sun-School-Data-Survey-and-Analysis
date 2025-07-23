import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase/supabaseClient";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar, Pie, Line, Doughnut, Radar, PolarArea } from "react-chartjs-2";
ChartJS.register(...registerables);

export default function AnalysisDashboard() {
  const [loading, setLoading] = useState(true);
  const [surveyData, setSurveyData] = useState({
    deviceUsage: null,
    addictionSigns: null,
    anxietyLevels: null,
    deviceHours: null,
    sleepIssues: null,
    counselingInterest: null,
    gradeDistribution: null,
    genderDistribution: null,
    behavioralPatterns: null,
  });

  useEffect(() => {
    fetchAnalysisData();
  }, []);

  const fetchAnalysisData = async () => {
    try {
      setLoading(true);

      // Fetch all data in parallel
      const [
        { data: deviceUsageData },
        { data: addictionSignsData },
        { data: anxietyLevelsData },
        { data: deviceHoursData },
        { data: sleepIssuesData },
        { data: counselingInterestData },
        { data: gradeDistributionData },
        { data: genderDistributionData },
        { data: behavioralPatternsData },
      ] = await Promise.all([
        supabase.from("device_usage_stats").select("*"),
        supabase.from("addiction_signs_stats").select("*"),
        supabase.from("anxiety_levels_stats").select("*"),
        supabase.rpc("get_device_hours_distribution"),
        supabase.rpc("get_sleep_issues_stats"),
        supabase.rpc("get_counseling_interest_stats"),
        supabase.rpc("get_grade_distribution"),
        supabase.rpc("get_gender_distribution"),
        supabase.rpc("get_behavioral_patterns_stats"),
      ]);

      setSurveyData({
        deviceUsage: deviceUsageData,
        addictionSigns: addictionSignsData,
        anxietyLevels: anxietyLevelsData,
        deviceHours: deviceHoursData,
        sleepIssues: sleepIssuesData,
        counselingInterest: counselingInterestData,
        gradeDistribution: gradeDistributionData,
        genderDistribution: genderDistributionData,
        behavioralPatterns: behavioralPatternsData,
      });
    } catch (error) {
      console.error("Error fetching analysis data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Chart options configuration
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Advanced Survey Analytics Dashboard
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Device Usage Patterns */}
          <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">
              Device Usage Patterns
            </h2>
            <div className="h-64">
              {surveyData.deviceUsage && (
                <Pie
                  data={{
                    labels: surveyData.deviceUsage.map(
                      (item) => item.usage_type
                    ),
                    datasets: [
                      {
                        data: surveyData.deviceUsage.map((item) => item.count),
                        backgroundColor: [
                          "rgba(255, 99, 132, 0.7)",
                          "rgba(54, 162, 235, 0.7)",
                          "rgba(255, 206, 86, 0.7)",
                          "rgba(75, 192, 192, 0.7)",
                        ],
                        borderColor: [
                          "rgba(255, 99, 132, 1)",
                          "rgba(54, 162, 235, 1)",
                          "rgba(255, 206, 86, 1)",
                          "rgba(75, 192, 192, 1)",
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={chartOptions}
                />
              )}
            </div>
          </div>

          {/* Device Hours Distribution */}
          <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Daily Device Hours</h2>
            <div className="h-64">
              {surveyData.deviceHours && (
                <Bar
                  data={{
                    labels: surveyData.deviceHours.map(
                      (item) => `${item.hour_range} hrs`
                    ),
                    datasets: [
                      {
                        label: "Number of Students",
                        data: surveyData.deviceHours.map((item) => item.count),
                        backgroundColor: "rgba(75, 192, 192, 0.7)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    ...chartOptions,
                    indexAxis: "y",
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                  }}
                />
              )}
            </div>
          </div>

          {/* Anxiety Levels */}
          <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">
              Reported Anxiety Levels
            </h2>
            <div className="h-64">
              {surveyData.anxietyLevels && (
                <Doughnut
                  data={{
                    labels: surveyData.anxietyLevels.map(
                      (item) => item.anxiety_level
                    ),
                    datasets: [
                      {
                        data: surveyData.anxietyLevels.map(
                          (item) => item.count
                        ),
                        backgroundColor: [
                          "rgba(255, 99, 132, 0.7)",
                          "rgba(255, 159, 64, 0.7)",
                          "rgba(255, 205, 86, 0.7)",
                        ],
                        borderColor: [
                          "rgba(255, 99, 132, 1)",
                          "rgba(255, 159, 64, 1)",
                          "rgba(255, 205, 86, 1)",
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={chartOptions}
                />
              )}
            </div>
          </div>

          {/* Sleep Issues */}
          <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">
              Sleep Issues Due to Device Usage
            </h2>
            <div className="h-64">
              {surveyData.sleepIssues && (
                <Line
                  data={{
                    labels: surveyData.sleepIssues.map(
                      (item) => item.sleep_issue
                    ),
                    datasets: [
                      {
                        label: "Number of Students",
                        data: surveyData.sleepIssues.map((item) => item.count),
                        backgroundColor: "rgba(153, 102, 255, 0.2)",
                        borderColor: "rgba(153, 102, 255, 1)",
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true,
                      },
                    ],
                  }}
                  options={{
                    ...chartOptions,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                  }}
                />
              )}
            </div>
          </div>

          {/* Grade Distribution */}
          {/* <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Grade Distribution</h2>
            <div className="h-64">
              {surveyData.gradeDistribution && (
                <PolarArea
                  data={{
                    labels: surveyData.gradeDistribution.map(
                      (item) => `Grade ${item.grade}`
                    ),
                    datasets: [
                      {
                        data: surveyData.gradeDistribution.map(
                          (item) => item.count
                        ),
                        backgroundColor: [
                          "rgba(255, 99, 132, 0.7)",
                          "rgba(54, 162, 235, 0.7)",
                          "rgba(255, 206, 86, 0.7)",
                          "rgba(75, 192, 192, 0.7)",
                          "rgba(153, 102, 255, 0.7)",
                          "rgba(255, 159, 64, 0.7)",
                        ],
                        borderColor: [
                          "rgba(255, 99, 132, 1)",
                          "rgba(54, 162, 235, 1)",
                          "rgba(255, 206, 86, 1)",
                          "rgba(75, 192, 192, 1)",
                          "rgba(153, 102, 255, 1)",
                          "rgba(255, 159, 64, 1)",
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={chartOptions}
                />
              )}
            </div>
          </div> */}

          {/* Gender Distribution */}
          {/* <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Gender Distribution</h2>
            <div className="h-64">
              {surveyData.genderDistribution && (
                <Pie
                  data={{
                    labels: surveyData.genderDistribution.map(
                      (item) => item.gender
                    ),
                    datasets: [
                      {
                        data: surveyData.genderDistribution.map(
                          (item) => item.count
                        ),
                        backgroundColor: [
                          "rgba(54, 162, 235, 0.7)",
                          "rgba(255, 99, 132, 0.7)",
                          "rgba(255, 206, 86, 0.7)",
                        ],
                        borderColor: [
                          "rgba(54, 162, 235, 1)",
                          "rgba(255, 99, 132, 1)",
                          "rgba(255, 206, 86, 1)",
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={chartOptions}
                />
              )}
            </div>
          </div> */}

          {/* Behavioral Patterns */}
          {/* <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">
              Behavioral Patterns Radar
            </h2>
            <div className="h-64">
              {surveyData.behavioralPatterns && (
                <Radar
                  data={{
                    labels: surveyData.behavioralPatterns.map(
                      (item) => item.behavior
                    ),
                    datasets: [
                      {
                        label: "Behavior Frequency",
                        data: surveyData.behavioralPatterns.map(
                          (item) => item.count
                        ),
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 2,
                      },
                    ],
                  }}
                  options={{
                    ...chartOptions,
                    scales: {
                      r: {
                        angleLines: {
                          display: true,
                        },
                        suggestedMin: 0,
                      },
                    },
                  }}
                />
              )}
            </div>
          </div> */}

          {/* Counseling Interest */}
          <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Counseling Interest</h2>
            <div className="h-64">
              {surveyData.counselingInterest && (
                <Bar
                  data={{
                    labels: surveyData.counselingInterest.map(
                      (item) => item.interest_level
                    ),
                    datasets: [
                      {
                        label: "Number of Students",
                        data: surveyData.counselingInterest.map(
                          (item) => item.count
                        ),
                        backgroundColor: "rgba(153, 102, 255, 0.7)",
                        borderColor: "rgba(153, 102, 255, 1)",
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    ...chartOptions,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                  }}
                />
              )}
            </div>
          </div>

          {/* Addiction Signs */}
          <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">
              Observed Addiction Signs
            </h2>
            <div className="h-64">
              {surveyData.addictionSigns && (
                <Pie
                  data={{
                    labels: surveyData.addictionSigns.map(
                      (item) => item.addiction_level
                    ),
                    datasets: [
                      {
                        data: surveyData.addictionSigns.map(
                          (item) => item.count
                        ),
                        backgroundColor: [
                          "rgba(255, 99, 132, 0.7)",
                          "rgba(54, 162, 235, 0.7)",
                          "rgba(255, 206, 86, 0.7)",
                        ],
                        borderColor: [
                          "rgba(255, 99, 132, 1)",
                          "rgba(54, 162, 235, 1)",
                          "rgba(255, 206, 86, 1)",
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={chartOptions}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
