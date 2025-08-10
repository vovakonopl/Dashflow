import {
  ClipboardList,
  FolderOpen,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import ActiveSidebarMenuButton from '@/components/layout/sidebar/SidebarMenuButton';
import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

const SideNavbar = async () => {
  return (
    <aside>
      <nav>
        <SidebarProvider className="max-md:bg-sidebar text-sidebar-foreground max-md:min-h-8 md:w-[var(--sidebar-width)]">
          <div className="w-full md:hidden">
            <SidebarTrigger className="ml-2 box-content py-1" />
            <Separator />
          </div>

          <Sidebar collapsible="icon">
            <SidebarTrigger className="mt-1 ml-2 box-content md:hidden" />
            <SidebarContent>
              <SidebarGroup>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <ActiveSidebarMenuButton asChild href="/">
                      {/* Dashboard */}
                      <Link href="/">
                        <LayoutDashboard />
                        <span>Dashboard</span>
                      </Link>
                    </ActiveSidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <ActiveSidebarMenuButton asChild href="/projects">
                      <Link href="/projects">
                        <FolderOpen />
                        <span>Projects</span>
                      </Link>
                    </ActiveSidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <ActiveSidebarMenuButton asChild href="/tasks">
                      <Link href="/tasks">
                        <ClipboardList />
                        <span>Tasks</span>
                      </Link>
                    </ActiveSidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>

            {/* TODO: display 'Log In' button instead of whole group while user is signed out */}
            <SidebarFooter>
              <SidebarGroup>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <ActiveSidebarMenuButton asChild href="/settings">
                      <Link href="/settings">
                        <Settings />
                        <span>Settings</span>
                      </Link>
                    </ActiveSidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <ActiveSidebarMenuButton asChild href="/profile">
                      <Link href="/profile">
                        <Users />
                        <span>Profile</span>
                      </Link>
                    </ActiveSidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton className="cursor-pointer">
                      <LogOut />
                      <span>Log Out</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
            </SidebarFooter>
          </Sidebar>
        </SidebarProvider>
      </nav>
    </aside>
  );
};

export default SideNavbar;
