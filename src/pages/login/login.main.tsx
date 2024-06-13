import { Button, Input } from "@/components/UI";
import React from "react";

const Login = () => {
  return (
    <section>
      <div className="px-8 py-24 mx-auto md:px-12 lg:px-32 max-w-7xl">
        <div className="max-w-md mx-auto md:max-w-sm md:w-96">
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
          <form className="mt-2">
            <Input
              label="Email"
              placeholder="Type email here..."
              inputClassName="text-sm"
            />
            <Input
              label="Password"
              type="password"
              placeholder="Type password here..."
              inputClassName="text-sm"
            />
            <Button className="w-full mt-6" variant="solid">
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
