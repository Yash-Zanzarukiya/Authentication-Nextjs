"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const [data, setData] = useState("Nothing");
  const router = useRouter();

  async function getUserDetails() {
    try {
      const res = await axios.get("/api/users/me");
      console.log("res: ", res);
      setData(res.data.data._id);
    } catch (error: any) {
      console.log("error: ", error);
      toast.error("Error");
    }
  }

  async function logoutUser() {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Successful");
      router.push("/login");
    } catch (error: any) {
      console.log("error: ", error);
      toast.error("Error");
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl mb-4 font-semibold">Profile</h1>
      <hr />
      <h2 className="p-1 px-3 mt-4 rounded capitalize">
        {data === "Nothing" ? (
          "Click to get user details"
        ) : (
          <span className=" bg-blue-700 text-white font-bold py-1 px-4 rounded">
            <Link href={`/profile/${data}`}>{data}</Link>
          </span>
        )}
      </h2>
      <hr />
      <button
        onClick={getUserDetails}
        className="bg-green-500 mt-4 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        Get User Details
      </button>
      <button
        onClick={logoutUser}
        className="bg-red-500 mt-4 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
}
