import { Menu } from "@/components/menu";
import { Sidebar } from "@/components/sidebar";
import React from "react";

const AuthLoginpage = () => {
  return (
    <>
      <div className="block">
        <div className="fixed l-0 t-0 border-b w-full py-2 bg-background">
          <Menu />
        </div>
        <div className="pt-12">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar
                className="block"
                playlists={["Dashboard", "Categories", "Transactions"]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLoginpage;
