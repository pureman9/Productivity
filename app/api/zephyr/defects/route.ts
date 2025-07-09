import { NextResponse } from "next/server"

// Mock API for defect management
export async function GET() {
  try {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800))

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
        steps: [
          "Navigate to login page on iOS Safari",
          "Enter valid credentials",
          "Click login button",
          "Application crashes",
        ],
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
        steps: [
          "Add items to cart",
          "Proceed to checkout",
          "Enter payment details",
          "Submit payment - times out after 30s",
        ],
      },
    ]

    return NextResponse.json(defects)
  } catch (error) {
    console.error("Error fetching defects:", error)
    return NextResponse.json({ error: "Failed to fetch defects" }, { status: 500 })
  }
}

// POST endpoint for creating new defects
export async function POST(request: Request) {
  try {
    const defectData = await request.json()

    // Simulate creating defect in Zephyr
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newDefect = {
      id: `DEF${String(Date.now()).slice(-3)}`,
      ...defectData,
      created: new Date().toISOString().split("T")[0],
      status: "open",
    }

    console.log("Created new defect:", newDefect)

    return NextResponse.json({
      success: true,
      defect: newDefect,
      message: "Defect created successfully",
    })
  } catch (error) {
    console.error("Error creating defect:", error)
    return NextResponse.json({ error: "Failed to create defect" }, { status: 500 })
  }
}
