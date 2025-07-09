"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, BarChart3, PieChart, Download, Calendar } from "lucide-react"

interface SummaryPanelProps {
  cycleData: any
}

export default function SummaryPanel({ cycleData }: SummaryPanelProps) {
  const executionTrends = [
    { date: "2024-01-10", passed: 45, failed: 5, total: 50 },
    { date: "2024-01-11", passed: 52, failed: 8, total: 60 },
    { date: "2024-01-12", passed: 58, failed: 7, total: 65 },
    { date: "2024-01-13", passed: 63, failed: 12, total: 75 },
    { date: "2024-01-14", passed: 68, failed: 10, total: 78 },
    { date: "2024-01-15", passed: 72, failed: 8, total: 80 },
  ]

  const currentTrend = executionTrends[executionTrends.length - 1]
  const previousTrend = executionTrends[executionTrends.length - 2]
  const successRateChange =
    (currentTrend.passed / currentTrend.total - previousTrend.passed / previousTrend.total) * 100

  const defectCategories = [
    { category: "UI/UX Issues", count: 8, percentage: 32 },
    { category: "Functional Bugs", count: 6, percentage: 24 },
    { category: "Performance", count: 5, percentage: 20 },
    { category: "Integration", count: 4, percentage: 16 },
    { category: "Security", count: 2, percentage: 8 },
  ]

  const testCoverageAreas = [
    { area: "Authentication", coverage: 95, tests: 20, passed: 19, failed: 1 },
    { area: "Payment Processing", coverage: 88, tests: 25, passed: 22, failed: 3 },
    { area: "User Management", coverage: 92, tests: 18, passed: 17, failed: 1 },
    { area: "Reporting", coverage: 78, tests: 15, passed: 12, failed: 3 },
    { area: "API Integration", coverage: 85, tests: 22, passed: 19, failed: 3 },
  ]

  return (
    <div className="space-y-6">
      {/* Executive Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Executive Summary</CardTitle>
          <CardDescription>High-level overview of testing progress and quality metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="font-medium">Success Rate Trend</span>
              </div>
              <div className="text-3xl font-bold text-green-600">
                {successRateChange > 0 ? "+" : ""}
                {successRateChange.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">vs. previous day</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Test Velocity</span>
              </div>
              <div className="text-3xl font-bold text-blue-600">{currentTrend.total - previousTrend.total}</div>
              <div className="text-sm text-gray-600">tests executed today</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-purple-600" />
                <span className="font-medium">Quality Score</span>
              </div>
              <div className="text-3xl font-bold text-purple-600">
                {Math.round((currentTrend.passed / currentTrend.total) * 100)}
              </div>
              <div className="text-sm text-gray-600">overall quality rating</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Coverage Analysis */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Test Coverage Analysis</CardTitle>
              <CardDescription>Coverage breakdown by functional areas</CardDescription>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {testCoverageAreas.map((area, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{area.area}</span>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-green-600">{area.passed} passed</span>
                    <span className="text-red-600">{area.failed} failed</span>
                    <Badge variant="outline">{area.coverage}% coverage</Badge>
                  </div>
                </div>
                <Progress value={area.coverage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Defect Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Defect Distribution</CardTitle>
            <CardDescription>Breakdown of defects by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {defectCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: `hsl(${index * 60}, 70%, 50%)` }} />
                    <span className="font-medium">{category.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">{category.count}</span>
                    <Badge variant="outline">{category.percentage}%</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Execution Timeline</CardTitle>
            <CardDescription>Daily test execution progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {executionTrends.slice(-5).map((trend, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">{trend.date}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-green-600">{trend.passed} passed</span>
                    <span className="text-red-600">{trend.failed} failed</span>
                    <Badge variant="outline">{Math.round((trend.passed / trend.total) * 100)}% success</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Recommendations & Action Items</CardTitle>
          <CardDescription>AI-powered insights and suggested improvements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-yellow-600" />
                <span className="font-medium text-yellow-800">Performance Optimization</span>
              </div>
              <p className="text-yellow-700 text-sm">
                Payment processing tests show increased failure rate. Consider reviewing timeout configurations and load
                balancing.
              </p>
            </div>

            <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-800">Test Coverage Gap</span>
              </div>
              <p className="text-blue-700 text-sm">
                Reporting module has the lowest coverage at 78%. Recommend adding more edge case scenarios.
              </p>
            </div>

            <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">Quality Improvement</span>
              </div>
              <p className="text-green-700 text-sm">
                Authentication module shows excellent stability with 95% success rate. Consider this as a template for
                other modules.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
