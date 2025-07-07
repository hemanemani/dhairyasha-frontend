
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarProvider } from "@/components/ui/sidebar"
import { ProfileLogo } from "./profile-logo";
import { MenuItems } from "./menu-items";


const AdminSidebar = () => {


  return (
    <SidebarProvider>
      <Sidebar className={`border-r bg-[#f5f5f3] transition-all overflow-x-hidden z-50`}>
          
        <SidebarHeader className="p-4">
          <ProfileLogo />
        </SidebarHeader>

        <SidebarContent className="px-3">

          <div className="flex flex-col justify-start h-full">
            <div className='flex flex-col'>
              <MenuItems />
            </div>
          </div>
        </SidebarContent>
        <SidebarFooter className="p-4">
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  )
}

export default AdminSidebar;

