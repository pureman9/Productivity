"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, XCircle, Clock, Play, Search, Filter } from "lucide-react"

interface ExecutionPanelProps {
  cycleData: any
}

export default function ExecutionPanel({ cycleData }: ExecutionPanelProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const testCases = cycleData?.testCases || [
    {
      id: "TC001",
      name: "User Login Functionality",
      status: "passed",
      priority: "high",
      assignee: "John Doe",
      executionTime: "2m 30s",
      lastRun: "2024-01-15 10:30",
    },
    {
      id: "TC002",
      name: "Payment Processing",
      status: "failed",
      priority: "critical",
      assignee: "Jane Smith",
      executionTime: "5m 15s",
      lastRun: "2024-01-15 11:45",
    },
    {
      id: "TC003",
      name: "Data Export Feature",
      status: "pending",
      priority: "medium",
      assignee: "Mike Johnson",
      executionTime: "-",
      lastRun: "-",
    },
    {
      id: "TC004",
      name: "Email Notifications",
      status: "passed",
      priority: "low",
      assignee: "Sarah Wilson",
      executionTime: "1m 45s",
      lastRun: "2024-01-15 09:15",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      passed: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800",
    }
    return variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"
  }

  const getPriorityBadge = (priority: string) => {
    const variants = {
      critical: "bg-red-100 text-red-800",
      high: "bg-orange-100 text-orange-800",
      medium: "bg-blue-100 text-blue-800",
      low: "bg-gray-100 text-gray-800",
    }
    return variants[priority as keyof typeof variants] || "bg-gray-100 text-gray-800"
  }

  const filteredTestCases = testCases.filter((testCase) => {
    const matchesSearch =
      testCase.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testCase.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || testCase.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const executionProgress = cycleData ? ((cycleData.passed + cycleData.failed) / cycleData.totalTests) * 100 : 0

  return (
    <div className="space-y-6">
      {/* Execution Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Release Execution Overview</CardTitle>
          <CardDescription>Current release cycle execution status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Progress</span>
                <span>{Math.round(executionProgress)}% Complete</span>
              </div>
              <Progress value={executionProgress} className="h-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{cycleData?.passed || 0}</div>
                <div className="text-sm text-green-700">Passed</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{cycleData?.failed || 0}</div>
                <div className="text-sm text-red-700">Failed</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{cycleData?.pending || 0}</div>
                <div className="text-sm text-yellow-700">Pending</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Case Management */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Test Case Execution</CardTitle>
              <CardDescription>Manage and execute test cases for this release</CardDescription>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Play className="h-4 w-4 mr-2" />
              Run Selected
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Search test cases..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="passed">Passed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Test Cases Table */}
          <div className="space-y-3">
            {filteredTestCases.map((testCase) => (
              <div key={testCase.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(testCase.status)}
                    <div>
                      <div className="font-medium">{testCase.name}</div>
                      <div className="text-sm text-gray-500">{testCase.id}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge className={getPriorityBadge(testCase.priority)}>{testCase.priority}</Badge>
                    <Badge className={getStatusBadge(testCase.status)}>{testCase.status}</Badge>
                    <div className="text-sm text-gray-500 text-right">
                      <div>Assignee: {testCase.assignee}</div>
                      <div>Duration: {testCase.executionTime}</div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Play className="h-3 w-3 mr-1" />
                      Run
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
