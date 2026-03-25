import { NextResponse } from "next/server"
import { convertToIso3 } from "@/lib/utils"
import { scenarioDataMap } from "@/lib/alignment-scenarios"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const country = searchParams.get("country") || "IND"
    
    // Convert from ISO2 to ISO3 if needed
    const countryCode = country.length === 2 ? convertToIso3(country) : country
    
    // Fetch data from the external source
    const response = await fetch("https://fapublicdata.blob.core.windows.net/fa-public-data/alignment_graph/alignment_data.json")
    
    if (!response.ok) {
      throw new Error(`Failed to fetch alignment data: ${response.status}`)
    }
    
    const data = await response.json()
    
    // Check if we have data for the requested country
    if (!data[countryCode]) {
      return NextResponse.json({ error: `No data available for country: ${countryCode}` }, { status: 404 })
    }
    
    // Return the raw data for the country
    return NextResponse.json(data[countryCode])
  } catch (error) {
    console.error("Error in alignment data API:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error occurred" },
      { status: 500 }
    )
  }
} 
