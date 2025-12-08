import {
  ClipboardList,
  FolderOpen,
  House,
  LayoutDashboard,
  LogIn,
} from 'lucide-react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import Logo from '@/components/layout/Logo';
import ButtonSkeleton from '@/components/layout/sidebar/ButtonSkeleton';
import OpenSettingsButton from '@/components/layout/sidebar/OpenSettingsButton';
import ActiveSidebarMenuButton from '@/components/layout/sidebar/SidebarMenuButton';
import SignOutButton from '@/components/layout/sidebar/SignOutButton';
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
  const t = await getTranslations('layout.sidebar');

  return (
    <aside>
      <nav>
        <SidebarProvider className="max-md:bg-sidebar text-sidebar-foreground max-md:min-h-8 md:w-[var(--sidebar-width)]">
          <div className="w-full md:hidden">
            <SidebarTrigger className="ml-2 box-content py-1" />
            <Separator />
          </div>

          <Sidebar collapsible="icon">
            <div className="flex items-center justify-between gap-2 px-3 pt-4 pb-1">
              <Link href="/">
                <Logo />
              </Link>
              <SidebarTrigger className="box-content md:hidden" />
            </div>
            <SidebarContent>
              <SidebarGroup>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <ActiveSidebarMenuButton asChild href="/">
                      <Link href="/">
                        <House />
                        <span>{t('links.home')}</span>
                      </Link>
                    </ActiveSidebarMenuButton>
                  </SidebarMenuItem>

                  {/* display only for authorised users*/}
                  <SignedIn waitUntilLoaded>
                    <SidebarMenuItem>
                      <ActiveSidebarMenuButton asChild href="/dashboard">
                        <Link href="/dashboard">
                          <LayoutDashboard />
                          <span>{t('links.dashboard')}</span>
                        </Link>
                      </ActiveSidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <ActiveSidebarMenuButton asChild href="/projects">
                        <Link href="/projects">
                          <FolderOpen />
                          <span>{t('links.projects')}</span>
                        </Link>
                      </ActiveSidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <ActiveSidebarMenuButton asChild href="/tasks">
                        <Link href="/tasks">
                          <ClipboardList />
                          <span>{t('links.tasks')}</span>
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
                  <SidebarMenuItem>
                    <OpenSettingsButton />
                  </SidebarMenuItem>

                  <SignedIn waitUntilLoaded>
                    {/*<SidebarMenuItem>*/}
                    {/*  <ActiveSidebarMenuButton asChild href="/profile">*/}
                    {/*    <Link href="/profile">*/}
                    {/*      <Users />*/}
                    {/*      <span>Profile</span>*/}
                    {/*    </Link>*/}
                    {/*  </ActiveSidebarMenuButton>*/}
                    {/*</SidebarMenuItem>*/}

                    <SidebarMenuItem>
                      <SignOutButton />
                    </SidebarMenuItem>
                  </SignedIn>

                  {/* content for unauthorised users */}
                  <SignedOut waitUntilLoaded>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild className="cursor-pointer">
                        <Link href="/sign-in">
                          <LogIn />
                          <span>{t('buttons.signIn')}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SignedOut>

                  {/* display skeleton while loading user data */}
                  <UserLoading>
                    <ButtonSkeleton textLineClassName="w-3/4" />
                    <ButtonSkeleton textLineClassName="w-1/2" />
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
