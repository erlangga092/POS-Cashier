import { LayoutApps } from "@/layouts/apps/layout-apps";
import { Head } from "@inertiajs/react";
import React from "react";

const DashboardPage = () => {
  return (
    <>
      <Head>
        <title>POS - Dashboard</title>
      </Head>
      <LayoutApps>
        <p>Welcome, Ang!</p>
      </LayoutApps>
    </>
  );
};

export default DashboardPage;
