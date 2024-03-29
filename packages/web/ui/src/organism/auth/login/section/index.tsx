import { Section } from "@ui/atom";
import { AuthLoginForm, AuthRegisterRedirect } from "@ui/molecule";
import { FC } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AuthLoginSectionProps {}

export const AuthLoginSection: FC<AuthLoginSectionProps> = () => {
  return (
    <Section id="auth-login-section">
      <div className="flex items-center justify-center w-full">
        <div className="max-w-xl ">
          <div className="p-4 rounded shadow bg-gray-50">
            <AuthLoginForm key="LoginForm" />
          </div>
          <div className="p-4 mt-5 rounded shadow bg-gray-50">
            <AuthRegisterRedirect />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AuthLoginSection;
