"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Clock, TrendingUp, Bug, PlayCircle } from "lucide-react"
import ExecutionPanel from "@/components/execution-panel"
import DefectPanel from "@/components/defect-panel"
import SummaryPanel from "@/components/summary-panel"

export default function TaskExecutionTracker() {
  const [activePanel, setActivePanel] = useState("execution")
  const [cycleData, setCycleData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCycleData()
  }, [])

  const fetchCycleData = async () => {
    try {
      const response = await fetch("/api/zephyr/cycle-summary")
      const data = await response.json()
      setCycleData(data)
    } catch (error) {
      console.error("Failed to fetch cycle data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Clock className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading task execution data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Task Execution Tracker</h1>
          <p className="text-slate-600">Monitor release execution, track defects, and analyze performance</p>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <PlayCircle className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-slate-600">Total Tests</p>
                    <p className="text-2xl font-bold">{cycleData?.totalTests || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-slate-600">Passed</p>
                    <p className="text-2xl font-bold text-green-600">{cycleData?.passed || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Bug className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="text-sm text-slate-600">Failed</p>
                    <p className="text-2xl font-bold text-red-600">{cycleData?.failed || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-slate-600">Success Rate</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {cycleData ? Math.round((cycleData.passed / cycleData.totalTests) * 100) : 0}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Panels */}
        <Tabs value={activePanel} onValueChange={setActivePanel} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="execution" className="flex items-center gap-2">
              <PlayCircle className="h-4 w-4" />
              Execution for Release
            </TabsTrigger>
            <TabsTrigger value="defects" className="flex items-center gap-2">
              <Bug className="h-4 w-4" />
              Defects & Issues
            </TabsTrigger>
            <TabsTrigger value="summary" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Summary & Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="execution" className="space-y-6">
            <ExecutionPanel cycleData={cycleData} />
          </TabsContent>

          <TabsContent value="defects" className="space-y-6">
            <DefectPanel cycleData={cycleData} />
          </TabsContent>

          <TabsContent value="summary" className="space-y-6">
            <SummaryPanel cycleData={cycleData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
