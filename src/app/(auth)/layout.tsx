import AuthProvider from "@/providers/AuthProvider";
import NavBar from "../../components/NavBar";
import BeachBackground from "@/assets/beach.jpg";
interface AuthLayoutProps {
  children: React.ReactNode | React.ReactNode[];
}
const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <AuthProvider onDeauthRoute="/">
      <div className="flex flex-col h-full w-full overflow-hidden">
        <NavBar className="shrink-0" />
        {children}
        <img src={BeachBackground.src} className="fixed top-0 left-0 w-full h-full object-cover z-[-1]" alt="praia" />
      </div>
    </AuthProvider>
  );
};

export default AuthLayout;
