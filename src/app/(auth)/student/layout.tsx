"use client";

import LoadingScreen from "@/components/LoadingScreen";
import { useAuthData } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";

interface StudentLayoutProps {
  children: React.ReactNode | React.ReactNode[];
}
const StudentLayout = ({ children }: StudentLayoutProps) => {
  const authData = useAuthData();
  const router = useRouter();

  if (authData.user?.role === "professor") {
    router.push("/teacher");
    return;
  }

  if (authData.user?.role) {
    return <>{children}</>;
  } else {
    return <LoadingScreen />
  }
};

export default StudentLayout;
