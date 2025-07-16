import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Calendar, Menu, Plus, User, Settings, LogOut, Bell } from 'lucide-react';


  const SidebarContent = () => (
    <div className="p-4 space-y-6">
      <div className="space-y-2">
        <h3 className="font-medium text-gray-900">Navigation</h3>
        <nav className="space-y-1">
          <Button variant="ghost" className="w-full justify-start">
            <Calendar className="mr-2 h-4 w-4" />
            Today
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Plus className="mr-2 h-4 w-4" />
            New Entry
          </Button>
        </nav>
      </div>
      
      <div className="space-y-2">
        <h3 className="font-medium text-gray-900">Categories</h3>
        <div className="space-y-1">
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-md hover:bg-gray-100 cursor-pointer">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm">Personal</span>
          </div>
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-md hover:bg-gray-100 cursor-pointer">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm">Work</span>
          </div>
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-md hover:bg-gray-100 cursor-pointer">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-sm">Reflection</span>
          </div>
        </div>
      </div>
    </div>
  );

const Header = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return(
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-4">
              <div className="flex items-center space-x-2 mb-6">
                <Calendar className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-semibold">Tippy Tippy</span>
              </div>
              <SidebarContent />
            </SheetContent>
          </Sheet>
          
          <div className="flex items-center space-x-2">
            <Calendar className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-semibold">Tippy Tippy</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/api/placeholder/32/32" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">John Doe</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    john@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    );
};
export default Header;