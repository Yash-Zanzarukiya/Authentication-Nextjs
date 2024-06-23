"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const router = useRouter();

  async function handleSignUp() {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", userData);
      console.log("response: ", response);
      router.push("/profile");
    } catch (error: any) {
      setError(true);
      console.log("Login error: ", error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (userData.email.length > 0 && userData.password.length > 0) setButtonDisabled(false);
    else setButtonDisabled(true);
  }, [userData]);

  return (
    <div className="h-screen flex items-center justify-center m-auto w-full  text-white">
      <div className="mx-8 w-[30%] my-6 p-10 mb-8 flex flex-col relative bg-white/15">
        <h2 className="capital text-3xl font-semibold text-center mb-5">LOGIN</h2>
        <div className="mx-auto flex w-full flex-col px-4 gap-y-2">
          <label htmlFor="email" className={` mt-3 inline-block text-gray-300`}>
            <span className=" text-red-600 text-l">* </span>
            Email
          </label>
          <input
            type="email"
            required
            id="email"
            placeholder="Enter your email"
            value={userData.email}
            onChange={(e) => {
              setUserData((pre) => ({ ...pre, email: e.target.value }));
            }}
            className="rounded-lg border bg-transparent px-3 py-2"
          />
          <label htmlFor="password" className={` mt-3  inline-block text-gray-300`}>
            <span className=" text-red-600 text-l">* </span>
            Password
          </label>
          <input
            type="password"
            required
            id="password"
            placeholder="Enter your password"
            value={userData.password}
            onChange={(e) => {
              setUserData((pre) => ({ ...pre, password: e.target.value }));
            }}
            className="rounded-lg border bg-transparent px-3 py-2"
          />
          <button
            type="button"
            onClick={handleSignUp}
            disabled={loading || buttonDisabled}
            className="py-3 mt-2 text-lg bg-[#ae7aff] hover:bg-[#ae7aff]/90 hover:border-dotted border border-white text-black disabled:cursor-not-allowed"
          >
            {loading ? <span>Processing...</span> : "Login"}
          </button>
          {error && <h2>Error</h2>}
          <h6 className="mx-auto text-md mb-3 mt-1">
            Don't have an Account yet?{" "}
            <Link href="/signup" className="font-semibold text-blue-600 hover:text-blue-400">
              SignUp now
            </Link>
          </h6>
        </div>
      </div>
    </div>
  );
}
