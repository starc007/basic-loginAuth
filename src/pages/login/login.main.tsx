import { Button, Input } from "@/components/UI";
import { useAppStore } from "@/store";
import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [errorMessages, setErrorMessages] = React.useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);

  const { loginWithEmail } = useAppStore((state) => ({
    loginWithEmail: state.loginWithEmail,
  }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email) {
      setErrorMessages({ ...errorMessages, email: "Email is required" });
      return;
    }
    if (!formData.password) {
      setErrorMessages({ ...errorMessages, password: "Password is required" });
      return;
    }
    setErrorMessages({ email: "", password: "" });

    setLoading(true);
    const isLoginSuccess = await loginWithEmail(
      formData.email,
      formData.password
    );

    if (!isLoginSuccess) {
      setLoading(false);
      setErrorMessages({
        ...errorMessages,
        email: "Invalid email or password",
        password: "Invalid email or password",
      });
    } else {
      setFormData({ email: "", password: "" });
      setLoading(false);
      navigate("/dashboard");
    }
  };

  return (
    <section>
      <div className="py-24 mx-auto max-w-sm">
        <div className="flex flex-col text-center">
          <h1 className="text-3xl font-semibold tracking-tighter text-gray-900">
            Lets do some magic
          </h1>
          <p className="mt-4 text-base font-medium text-gray-500">
            Build better, built faster (use beui.xyz)
          </p>
        </div>
        <div className="mt-8">
          <Button className="w-full" variant="ghost">
            Sign in with Wallet
          </Button>
          <div className="relative py-3 mt-5">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 text-sm text-black bg-white">
                Or continue with
              </span>
            </div>
          </div>
        </div>
        <form className="mt-2" onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            placeholder="Type email here..."
            inputClassName="text-sm"
            errorText={errorMessages.email}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <Input
            label="Password"
            type="password"
            placeholder="Type password here..."
            inputClassName="text-sm"
            wrapperClassName="mt-4"
            errorText={errorMessages.password}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <Button
            disabled={loading}
            showloading={loading}
            className="w-full mt-6"
            variant="solid"
          >
            Sign in
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Login;
