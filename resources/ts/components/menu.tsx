import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useForm } from "@inertiajs/react";
import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";

export function Menu() {
  const form = useForm();

  return (
    <Menubar className="rounded-none border-b border-none px-2 lg:px-4">
      <div className="flex justify-between items-center w-full">
        <div className="menu flex"></div>
        <div className="items-end">
          <MenubarMenu>
            <MenubarTrigger className="font-bold">
              <Avatar className="cursor-pointer">
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarLabel>Account</MenubarLabel>
              <MenubarSeparator />
              <MenubarItem
                onClick={() => form.post("/logout")}
                className="cursor-pointer"
              >
                Logout
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </div>
      </div>
    </Menubar>
  );
}
