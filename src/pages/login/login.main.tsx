import { Button, Input } from "@/components/UI";
import { useAppStore } from "@/store";
import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
  });
  const [errorMessages, setErrorMessages] = React.useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [isWalletConnectLoading, setIsWalletConnectLoading] =
    React.useState(false);

  const { loginWithEmail, loginWithWallet } = useAppStore((state) => ({
    loginWithEmail: state.loginWithEmail,
    loginWithWallet: state.loginWithWallet,
  }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.username) {
      setErrorMessages({ ...errorMessages, username: "Email is required" });
      return;
    }
    if (!formData.password) {
      setErrorMessages({ ...errorMessages, password: "Password is required" });
      return;
    }
    setErrorMessages({ username: "", password: "" });

    setLoading(true);
    const isLoginSuccess = await loginWithEmail(
      formData.username,
      formData.password
    );

    if (!isLoginSuccess) {
      setLoading(false);
      setErrorMessages({
        ...errorMessages,
        username: "Invalid username or password",
        password: "Invalid username or password",
      });
    } else {
      setFormData({ username: "", password: "" });
      setLoading(false);
      navigate("/dashboard");
    }
  };

  /**
   * Only for metamask wallet
   * PLEASE USE WALLET CONNECT LIBRARY FOR PRODUCTION (e.g. web3modal)
   * NOTE: It wont work for account change and network change
   *
   */
  const handleConnectWallet = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const provider = (window as any).ethereum;
    if (!provider) {
      alert("Please install metamask wallet");
      return;
    }

    if (!provider.isMetaMask) {
      alert("Please install metamask wallet");
      return;
    }

    try {
      setIsWalletConnectLoading(true);
      const accounts = await provider.request({ method: "eth_accounts" });

      if (accounts.length === 0) {
        alert("Please connect your wallet");
        return;
      }

      await loginWithWallet(accounts[0]);
      setIsWalletConnectLoading(false);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
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
          <Button
            disabled={isWalletConnectLoading || loading}
            showloading={isWalletConnectLoading}
            onClick={handleConnectWallet}
            className="w-full"
            variant="ghost"
          >
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
            label="Username"
            placeholder="Type username here..."
            inputClassName="text-sm"
            errorText={errorMessages.username}
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
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
            disabled={loading || isWalletConnectLoading}
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
