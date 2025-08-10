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
    <SidebarProvider className="max-md:min-h-8 md:w-[var(--sidebar-width)]">
      <SidebarTrigger className="ml-2 box-content py-1 md:hidden" />

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
  );
};

export default SideNavbar;
