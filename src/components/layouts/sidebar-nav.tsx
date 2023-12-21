"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { SidebarNavItem } from "@/types"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

export interface SidebarNavProps {
  items: SidebarNavItem[],
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>,
  showPageWhenMenuClicked?: boolean
}

export function SidebarNav({ items, setIsOpen, showPageWhenMenuClicked = false }: SidebarNavProps) {
  const pathname = usePathname()
  if (!items?.length) return null

  return (
    <>
      <div className="flex justify-center">
        <Icons.hy className="mb-20 h-16 w-16" aria-hidden="true" />
      </div>
      <div className="flex w-full flex-col gap-2">
        {items.map((item, index) => {
          const Icon = Icons[item.icon ?? "chevronLeft"]
          return item.href ? (
            <Link
              key={index}
              href={item.href}
              target={item.external ? "_blank" : ""}
              rel={item.external ? "noreferrer" : ""}
              onClick={() => setIsOpen?.(false)}
            >
              <span
                className={cn(
                  "group flex w-full items-center border border-transparent py-2 pl-6 pr-2",
                  pathname === item.href
                    ? "font-medium text-foreground bg-background"
                    : "text-sidemenu-foreground",
                  item.disabled && "pointer-events-none opacity-60"
                )}
              >
                <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
                <span>{item.title}</span>
              </span>
            </Link>
          ) : (
            <span
              key={index}
              className="flex w-full cursor-not-allowed items-center rounded-md p-2 text-sidemenu-foreground hover:underline"
            >
              {item.title}
            </span>
          )
        })}
      </div>
    </>
  )
}
