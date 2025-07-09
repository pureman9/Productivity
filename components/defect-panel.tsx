"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { AlertTriangle, Bug, Plus, Search, Filter, Calendar } from "lucide-react"

interface DefectPanelProps {
  cycleData: any
}

export default function DefectPanel({ cycleData }: DefectPanelProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const defects = [
    {
      id: "DEF001",
      title: "Login page crashes on mobile devices",
      description: "Application crashes when attempting to login on iOS Safari",
      severity: "critical",
      status: "open",
      priority: "high",
      assignee: "John Doe",
      reporter: "QA Team",
      created: "2024-01-15",
      testCase: "TC001",
    },
    {
      id: "DEF002",
      title: "Payment gateway timeout error",
      description: "Payment processing fails with timeout after 30 seconds",
      severity: "high",
      status: "in-progress",
      priority: "high",
      assignee: "Jane Smith",
      reporter: "Customer Support",
      created: "2024-01-14",
      testCase: "TC002",
    },
    {
      id: "DEF003",
      title: "Export CSV missing column headers",
      description: "CSV export functionality missing proper column headers",
      severity: "medium",
      status: "resolved",
      priority: "medium",
      assignee: "Mike Johnson",
      reporter: "Business Analyst",
      created: "2024-01-13",
      testCase: "TC003",
    },
    {
      id: "DEF004",
      title: "Email notification formatting issues",
      description: "HTML formatting broken in email notifications",
      severity: "low",
      status: "open",
      priority: "low",
      assignee: "Sarah Wilson",
      reporter: "End User",
      created: "2024-01-12",
      testCase: "TC004",
    },
  ]

  const getSeverityBadge = (severity: string) => {
    const variants = {
      critical: "bg-red-100 text-red-800",
      high: "bg-orange-100 text-orange-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-blue-100 text-blue-800",
    }
    return variants[severity as keyof typeof variants] || "bg-gray-100 text-gray-800"
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      open: "bg-red-100 text-red-800",
      "in-progress": "bg-yellow-100 text-yellow-800",
      resolved: "bg-green-100 text-green-800",
      closed: "bg-gray-100 text-gray-800",
    }
    return variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"
  }

  const filteredDefects = defects.filter((defect) => {
    const matchesSearch =
      defect.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      defect.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSeverity = severityFilter === "all" || defect.severity === severityFilter
    const matchesStatus = statusFilter === "all" || defect.status === statusFilter
    return matchesSearch && matchesSeverity && matchesStatus
  })

  const defectStats = {
    total: defects.length,
    open: defects.filter((d) => d.status === "open").length,
    inProgress: defects.filter((d) => d.status === "in-progress").length,
    resolved: defects.filter((d) => d.status === "resolved").length,
  }

  return (
    <div className="space-y-6">
      {/* Defect Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Defect Overview</CardTitle>
          <CardDescription>Current defect status and metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{defectStats.total}</div>
              <div className="text-sm text-blue-700">Total Defects</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{defectStats.open}</div>
              <div className="text-sm text-red-700">Open</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{defectStats.inProgress}</div>
              <div className="text-sm text-yellow-700">In Progress</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{defectStats.resolved}</div>
              <div className="text-sm text-green-700">Resolved</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Defect Management */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Defect Tracking</CardTitle>
              <CardDescription>Manage and track defects found during testing</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-red-600 hover:bg-red-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Report Defect
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Report New Defect</DialogTitle>
                  <DialogDescription>Provide details about the defect you've encountered</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="defect-title">Title</Label>
                    <Input id="defect-title" placeholder="Brief description of the defect" />
                  </div>
                  <div>
                    <Label htmlFor="defect-description">Description</Label>
                    <Textarea id="defect-description" placeholder="Detailed description of the defect" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="severity">Severity</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select severity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="critical">Critical</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="assignee">Assignee</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Assign to" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="john">John Doe</SelectItem>
                          <SelectItem value="jane">Jane Smith</SelectItem>
                          <SelectItem value="mike">Mike Johnson</SelectItem>
                          <SelectItem value="sarah">Sarah Wilson</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-red-600 hover:bg-red-700">Report Defect</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Search defects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-40">
                <AlertTriangle className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Defects List */}
          <div className="space-y-4">
            {filteredDefects.map((defect) => (
              <div key={defect.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Bug className="h-5 w-5 text-red-600 mt-1" />
                    <div className="flex-1">
                      <div className="font-medium text-lg">{defect.title}</div>
                      <div className="text-sm text-gray-600 mb-2">{defect.description}</div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>ID: {defect.id}</span>
                        <span>Test Case: {defect.testCase}</span>
                        <span>Reporter: {defect.reporter}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {defect.created}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="flex gap-2">
                      <Badge className={getSeverityBadge(defect.severity)}>{defect.severity}</Badge>
                      <Badge className={getStatusBadge(defect.status)}>{defect.status.replace("-", " ")}</Badge>
                    </div>
                    <div className="text-sm text-gray-500">Assigned to: {defect.assignee}</div>
                    <Button variant="outline" size="sm">
                      View Details
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
