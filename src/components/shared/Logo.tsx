"use client"

import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  variant?: "default" | "white" | "red" | "dark" | "cream"
  showTagline?: boolean
}

const colorMap = {
  default: "#717178",
  white: "#FFFFFF",
  red: "#FD3434",
  dark: "#1E1E1E",
  cream: "#E6E1C3"
}

export function Logo({ className, variant = "default", showTagline = false }: LogoProps) {
  const fillColor = colorMap[variant]

  return (
    <div className={cn("flex flex-col", className)}>
      <svg
        viewBox="0 0 406 91"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        {/* C */}
        <path
          d="M0 18C0 8.05888 8.05888 0 18 0H52V26H26V65H52V91H18C8.05888 91 0 82.9411 0 73V18Z"
          fill={fillColor}
        />

        {/* A */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M68 18C68 8.05888 76.0589 0 86 0H120C129.941 0 138 8.05888 138 18V91H112V65H94V91H68V18ZM94 39H112V26H94V39Z"
          fill={fillColor}
        />

        {/* P */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M154 0H188C197.941 0 206 8.05888 206 18V47C206 56.9411 197.941 65 188 65H180V91H154V0ZM180 39V26H180.5C180.776 26 181 26.2239 181 26.5V38.5C181 38.7761 180.776 39 180.5 39H180Z"
          fill={fillColor}
        />

        {/* Dot */}
        <circle cx="227" cy="82" r="9" fill={fillColor} />

        {/* C (second) */}
        <path
          d="M252 18C252 8.05888 260.059 0 270 0H304V26H278V65H304V91H270C260.059 91 252 82.9411 252 73V18Z"
          fill={fillColor}
        />

        {/* O */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M320 18C320 8.05888 328.059 0 338 0H388C397.941 0 406 8.05888 406 18V73C406 82.9411 397.941 91 388 91H338C328.059 91 320 82.9411 320 73V18ZM346 26V65H380V26H346Z"
          fill={fillColor}
        />
      </svg>

      {showTagline && (
        <span
          className="text-xs tracking-[0.3em] uppercase mt-2"
          style={{ color: fillColor }}
        >
          Digital Ads Marketing Performance
        </span>
      )}
    </div>
  )
}

export function LogoIcon({ className, variant = "default" }: Omit<LogoProps, "showTagline">) {
  const fillColor = colorMap[variant]

  return (
    <svg
      viewBox="0 0 52 91"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-auto h-full", className)}
    >
      {/* Just the C */}
      <path
        d="M0 18C0 8.05888 8.05888 0 18 0H52V26H26V65H52V91H18C8.05888 91 0 82.9411 0 73V18Z"
        fill={fillColor}
      />
    </svg>
  )
}
