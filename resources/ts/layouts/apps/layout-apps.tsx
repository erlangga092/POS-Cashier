import { Menu } from "@/components/menu";
import { Sidebar } from "@/components/sidebar";
import React from "react";

export function LayoutApps({ children }: { children: React.ReactNode }) {
  return (
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
            <div className="col-span-3 lg:col-span-4 lg:border-l">
              <div className="h-full px-4 py-6 lg:px-8">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
