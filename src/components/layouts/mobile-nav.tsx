"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import type { MainNavItem, SidebarNavItem } from "@/types"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Icons } from "@/components/icons"
import { SidebarNav } from "./sidebar-nav"

interface MobileNavProps {
  mainNavItems?: MainNavItem[]
  sidebarNavItems: SidebarNavItem[]
}

export function MobileNav({ mainNavItems, sidebarNavItems }: MobileNavProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)
  if (!sidebarNavItems?.length) return null

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
        >
          <Icons.menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pl-0 pr-0 bg-sidemenu ">
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
          <SidebarNav items={sidebarNavItems} setIsOpen={setIsOpen} />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}