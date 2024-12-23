"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BsGoogle } from "react-icons/bs";

const LoginPage = () => {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session?.status === "authenticated") router.push("/");
  }, [session, router]);

  const socialAction = async () => {
    signIn("google", {
      redirect: false,
    }).then((callback) => {
      console.log(callback);
    });
  };

  return (
    <section
      className="h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
    >
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-10 space-y-8">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back!
        </h2>
        <p className="text-center text-gray-600">
          Sign in to manage your Google Business Profile.
        </p>

        <div className="mt-6 flex flex-col gap-4">
          <button
            onClick={socialAction}
            className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-all duration-300"
          >
            <BsGoogle size={20} />
            Continue with Google
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            By signing in, you agree to our{" "}
            <a href="#" className="text-indigo-500 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-indigo-500 hover:underline">
              Privacy Policy
            </a>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
