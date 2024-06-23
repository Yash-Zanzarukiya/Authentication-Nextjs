"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmail() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const VerifyEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", { token });
      console.log("response: ", response);
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      VerifyEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl mb-4 ">Verify Email</h1>
      <h2 className="p-2 rounded bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

      {verified && (
        <div>
          <h2 className=" my-5 text-2xl text-green-500">Email Verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl mt-4 px-4 bg-red-500 text-black">Error</h2>
        </div>
      )}
    </div>
  );
}
