import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { dashboardConfig } from "@/config/dashboard"

import { ScrollArea } from "@/components/ui/scroll-area"
import { SidebarNav } from "@/components/layouts/sidebar-nav"
import { SiteHeader } from "@/components/layouts/site-header"

import "@/styles/globals.css"
import { MobileNav } from "@/components/layouts/mobile-nav"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen antialiased bg-dwhite",
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="flex min-h-screen flex-col">
            <div className="flex-1 items-start lg:grid lg:grid-cols-[240px_minmax(0,1fr)] ">
              <aside className="sticky top-0 font-medium bg-sidemenu text-sidemenu-foreground text-sm font-inter z-30 hidden h-[100vh] w-full shrink-0 overflow-y-auto border-r lg:block">
                <ScrollArea className="">
                  <SidebarNav items={dashboardConfig.sidebarNav} />
                </ScrollArea>
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <p className="text-sm text-gray-500">&copy; 2024 Project</p>
                </div>
              </aside>
              <div>
                <SiteHeader >
                  <MobileNav
                    sidebarNavItems={dashboardConfig.sidebarNav}
                  />
                </SiteHeader>
                <main className="container flex w-full flex-col overflow-hidden">
                  <div className='h-8'></div>
                  <article className='flex flex-col gap-4 mb-2 min-h-[3rem]'>
                    {children}
                  </article>
                </main>
              </div>
            </div>
          </div>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}