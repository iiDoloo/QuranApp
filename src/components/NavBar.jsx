import React from 'react';
import { useState, useEffect } from 'react';
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useTheme } from "./theme-provider";

const NavBar = () => {
  const { theme, setTheme } = useTheme();
  const [logged,setLogged] = useState(false)
  useEffect(() => {
    const userName = localStorage.getItem('username');

    if (userName) {
      setLogged(true)
    }})
  const handleClick = ()=>{
    setLogged(false)
    localStorage.clear();
  }

  return (
    <div className="flex justify-between items-center p-4 bg-background text-foreground">
      <NavigationMenu>
        <NavigationMenuList>
        <NavigationMenuItem>
            <NavigationMenuLink className="px-4 py-2 hover:bg-accent" href="/">
              QuranAPP
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className="px-4 py-2 hover:bg-accent" href="/login">
              Login
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className="px-4 py-2 hover:bg-accent" href="/register">
              Register
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className="px-4 py-2 hover:bg-accent" href="/goals">
              Goals
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            {logged && <NavigationMenuLink className="px-4 py-2 hover:bg-accent text-orange-600" href="/goals" onClick={handleClick}>
              Logout
            </NavigationMenuLink>}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
};

export default NavBar;