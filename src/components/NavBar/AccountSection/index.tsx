import { authorization } from "@/core";
import { useTooltip } from "@/providers/TooltipProvider";
import { Divider, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import UserIcon from "../../UserIcon";
import { useAuthData } from "@/providers/AuthProvider";

const AccountSection = () => {
  const authData = useAuthData();
  const router = useRouter();
  const accountIconRef = useRef<HTMLDivElement>(null);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  const openAccountPage = useCallback(() => {
    if (authData.user?.role === "aluno") {
      router.push("/student/account");
    }
    setIsAccountMenuOpen(false);
  }, [authData?.user?.role, router]);

  return (
    <div className="flex h-full" ref={accountIconRef}>
      <UserIcon
        className="hover:scale-110 duration-100 cursor-pointer"
        role={authData.user?.role}
        ref={accountIconRef}
        onClick={() => setIsAccountMenuOpen(true)}
        {...useTooltip("Meu cadastro")}
      />

      <Menu
        open={isAccountMenuOpen}
        anchorEl={accountIconRef?.current}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        anchorReference="anchorEl"
        onClose={() => setIsAccountMenuOpen(false)}
      >
        <MenuItem onClick={openAccountPage}>Meu cadastro</MenuItem>
        <Divider />
        <MenuItem onClick={() => authorization.clearAuthData()}>Sair</MenuItem>
      </Menu>
    </div>
  );
};

export default AccountSection;
