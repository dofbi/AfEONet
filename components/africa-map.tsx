"use client"

import { useState, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"
import { countryMap, getCountryByCode, statusLabels } from "@/lib/countries"
import { Card, CardContent } from "@/components/ui/card"

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

interface TooltipData {
  name: string
  status: string
}

function getStatusFill(status: string): string {
  return `hsl(var(--status-${status}))`
}

export function AfricaMap() {
  const router = useRouter()
  const [hovered, setHovered] = useState<TooltipData | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleContainerMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    setMousePos({ x: event.clientX + 12, y: event.clientY - 12 })
  }, [])

  const handleMouseEnter = useCallback((geo: { properties: Record<string, unknown> }) => {
    const isoA2 = String(geo.properties.ISO_A2 || geo.properties.iso_a2 || "").toLowerCase()
    if (isoA2 === "-99" || !isoA2) return
    const country = getCountryByCode(isoA2)
    if (!country) return
    setHovered({ name: country.name, status: country.status })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setHovered(null)
  }, [])

  const handleClick = useCallback(
    (geo: { properties: Record<string, unknown> }) => {
      const isoA2 = String(geo.properties.ISO_A2 || geo.properties.iso_a2 || "").toLowerCase()
      if (isoA2 === "-99" || !isoA2) return
      const country = getCountryByCode(isoA2)
      if (!country) return
      router.push(`/countries/${country.code}`)
    },
    [router]
  )

  const isAfricanCountry = useCallback((geo: { properties: Record<string, unknown> }): boolean => {
    const isoA2 = String(geo.properties.ISO_A2 || geo.properties.iso_a2 || "").toLowerCase()
    if (isoA2 === "-99" || !isoA2) return false
    return countryMap.has(isoA2)
  }, [])

  return (
    <Card className="w-full border-primary/20">
      <CardContent className="p-4">
        <h3 className="text-lg font-medium mb-4 text-primary">Civic Space Status in Africa</h3>

        <div
          ref={containerRef}
          className="relative w-full aspect-[4/3] max-h-[500px]"
          onMouseMove={handleContainerMouseMove}
        >
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 400,
              center: [20, 5],
            }}
            className="w-full h-full"
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <ZoomableGroup center={[20, 0]} zoom={1}>
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    if (!isAfricanCountry(geo)) return null

                    const isoA2 = String(geo.properties.ISO_A2 || geo.properties.iso_a2 || "").toLowerCase()
                    const country = getCountryByCode(isoA2)
                    const status = country?.status || "unknown"
                    const fill = getStatusFill(status)

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={fill}
                        stroke="hsl(var(--border))"
                        strokeWidth={0.5}
                        style={{
                          default: {
                            fill,
                            stroke: "hsl(var(--border))",
                            strokeWidth: 0.5,
                            outline: "none",
                            transition: "all 0.2s ease",
                          },
                          hover: {
                            fill,
                            stroke: "#fff",
                            strokeWidth: 1,
                            outline: "none",
                            filter: "brightness(1.1)",
                            cursor: "pointer",
                          },
                          pressed: {
                            fill,
                            stroke: "#fff",
                            strokeWidth: 1,
                            outline: "none",
                            filter: "brightness(0.95)",
                          },
                        }}
                        onMouseEnter={() => handleMouseEnter(geo)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick(geo)}
                      />
                    )
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>

          {hovered && (
            <div
              className="fixed z-50 bg-card border border-border rounded-lg shadow-lg px-3 py-2 pointer-events-none"
              style={{
                left: mousePos.x,
                top: mousePos.y,
              }}
            >
              <div className="font-medium text-sm text-primary">{hovered.name}</div>
              <div className="flex items-center gap-1.5 mt-1">
                <span
                  className="inline-block w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: getStatusFill(hovered.status) }}
                />
                <span className="text-xs text-muted-foreground">
                  {statusLabels[hovered.status as keyof typeof statusLabels] || hovered.status}
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
