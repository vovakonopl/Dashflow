import {
  ClipboardList,
  FolderOpen,
  House,
  LayoutDashboard,
  LogIn,
  LogOut,
  Settings,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import ActiveSidebarMenuButton from '@/components/layout/sidebar/SidebarMenuButton';
import SkeletonBlock from '@/components/layout/sidebar/SkeletonBlock';
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
import SignedIn from '@/components/utils/user-state/SignedIn';
import SignedOut from '@/components/utils/user-state/SignedOut';
import UserLoading from '@/components/utils/user-state/UserLoading';

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
                      <Link href="/">
                        <House />
                        <span>Home</span>
                      </Link>
                    </ActiveSidebarMenuButton>
                  </SidebarMenuItem>

                  {/* display only for authorised users*/}
                  <SignedIn>
                    <SidebarMenuItem>
                      <ActiveSidebarMenuButton asChild href="/dashboard">
                        <Link href="/dashboard">
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
                  </SignedIn>

                  {/* display skeleton while loading user data */}
                  <UserLoading>
                    <SkeletonBlock />
                  </UserLoading>
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
              <SidebarGroup>
                <SidebarMenu>
                  {/* content for authorised users*/}
                  <SignedIn>
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
                        <span>Sign Out</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SignedIn>

                  {/* content for unauthorised users */}
                  <SignedOut>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild className="cursor-pointer">
                        <Link href="/sign-in">
                          <LogIn />
                          <span>Sign In</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SignedOut>

                  {/* display skeleton while loading user data */}
                  <UserLoading>
                    <SkeletonBlock />
                  </UserLoading>
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
