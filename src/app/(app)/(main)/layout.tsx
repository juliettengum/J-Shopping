import type { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { navigationData } from "@/constants/navigation";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header navigationData={navigationData} />
      <main>{children}</main>
      <Footer />
    </>
  );
}

