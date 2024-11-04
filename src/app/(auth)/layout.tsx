import AuthProvider from "@/providers/AuthProvider";
import NavBar from "../../components/NavBar";
import WavesAnimatedBackground from "../../components/WavesAnimatedBackground";

interface AuthLayoutProps {
  children: React.ReactNode | React.ReactNode[];
}
const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <AuthProvider onDeauthRoute="/">
      <div className="flex flex-col h-full w-full overflow-hidden">
        <NavBar className="shrink-0" />
        {children}
        <WavesAnimatedBackground />
      </div>
    </AuthProvider>
  );
};

export default AuthLayout;
