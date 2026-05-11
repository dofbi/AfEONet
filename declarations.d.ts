declare module '*.css'

declare module 'react-simple-maps' {
  import type React from 'react'

  interface ComposableMapProps {
    projection?: string
    projectionConfig?: {
      scale?: number
      center?: [number, number]
      rotate?: [number, number, number]
      parallels?: [number, number]
    }
    width?: number
    height?: number
    viewBox?: string
    preserveAspectRatio?: string
    className?: string
    style?: React.CSSProperties
    children?: React.ReactNode
  }

  interface ZoomableGroupProps {
    center?: [number, number]
    zoom?: number
    minZoom?: number
    maxZoom?: number
    translateExtent?: [[number, number], [number, number]]
    onMoveStart?: (event: unknown, position: { coordinates: [number, number]; zoom: number }) => void
    onMove?: (event: unknown, position: { coordinates: [number, number]; zoom: number }) => void
    onMoveEnd?: (event: unknown, position: { coordinates: [number, number]; zoom: number }) => void
    className?: string
    children?: React.ReactNode
  }

  interface GeographiesProps {
    geography: string | object
    children: (props: {
      geographies: GeographyType[]
    }) => React.ReactNode
  }

  interface GeographyType {
    rsmKey: string
    type: string
    properties: Record<string, unknown>
    geometry: {
      type: string
      coordinates: unknown
    }
    [key: string]: unknown
  }

  interface GeographyProps {
    geography: GeographyType
    className?: string
    style?: {
      default?: React.CSSProperties
      hover?: React.CSSProperties
      pressed?: React.CSSProperties
    }
    fill?: string
    stroke?: string
    strokeWidth?: number
    onClick?: (event: React.MouseEvent<SVGPathElement, MouseEvent>) => void
    onMouseEnter?: (event: React.MouseEvent<SVGPathElement, MouseEvent>) => void
    onMouseMove?: (event: React.MouseEvent<SVGPathElement, MouseEvent>) => void
    onMouseLeave?: (event: React.MouseEvent<SVGPathElement, MouseEvent>) => void
    tabIndex?: number
  }

  export const ComposableMap: React.FC<ComposableMapProps>
  export const ZoomableGroup: React.FC<ZoomableGroupProps>
  export const Geographies: React.FC<GeographiesProps>
  export const Geography: React.FC<GeographyProps>
  export const Marker: React.FC<{
    coordinates: [number, number]
    children?: React.ReactNode
  }>
  export const Annotation: React.FC<{
    subject: [number, number]
    children?: React.ReactNode
  }>
  export const Graticule: React.FC<{
    step?: [number, number]
    stroke?: string
    strokeWidth?: number
    fill?: string
    className?: string
  }>
  export const Line: React.FC<{
    from: [number, number]
    to: [number, number]
    stroke?: string
    strokeWidth?: number
    fill?: string
    className?: string
  }>
  export const Sphere: React.FC<{
    id?: string
    fill?: string
    stroke?: string
    strokeWidth?: number
    className?: string
  }>
  export const MapContext: React.Context<unknown>
  export const MapProvider: React.FC<{ children: React.ReactNode }>
  export const ZoomPanContext: React.Context<unknown>
  export const ZoomPanProvider: React.FC<{ children: React.ReactNode }>
  export function useGeographies(): { geographies: GeographyType[] }
  export function useMapContext(): unknown
  export function useZoomPan(): unknown
  export function useZoomPanContext(): unknown
}
