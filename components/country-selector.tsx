"use client"

import * as React from "react"
import Link from "next/link"

import { countries, CountryStatus, statusLabels } from "@/lib/countries"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const statuses: Array<CountryStatus | "all"> = [
  "all",
  "open",
  "narrowed",
  "obstructed",
  "repressed",
  "closed",
  "unknown",
]

const statusTextColor: Record<CountryStatus, string> = {
  open: "text-white",
  narrowed: "text-black",
  obstructed: "text-white",
  repressed: "text-white",
  closed: "text-white",
  unknown: "text-black",
}

export function CountrySelector() {
  const [activeTab, setActiveTab] = React.useState<CountryStatus | "all">("all")

  const filtered =
    activeTab === "all" ? countries : countries.filter((c) => c.status === activeTab)

  return (
    <Tabs
      value={activeTab}
      onValueChange={(v) => setActiveTab(v as CountryStatus | "all")}
      className="w-full"
    >
      <TabsList className="flex flex-wrap h-auto gap-1 mb-4">
        {statuses.map((s) => (
          <TabsTrigger key={s} value={s} className="capitalize">
            {s === "all" ? "All" : statusLabels[s]}
          </TabsTrigger>
        ))}
      </TabsList>

      <div
        role="list"
        aria-label="Countries"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {filtered.map((country) => (
          <Link
            key={country.code}
            href={`/countries/${country.code}`}
            role="listitem"
            className={cn(
              "group block rounded-lg border p-4 shadow-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "bg-card text-card-foreground"
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-medium">{country.name}</span>
              <Badge
                className={cn(
                  "shrink-0 border-none capitalize",
                  `status-${country.status}`,
                  statusTextColor[country.status]
                )}
              >
                {statusLabels[country.status]}
              </Badge>
            </div>
          </Link>
        ))}
      </div>
    </Tabs>
  )
}
