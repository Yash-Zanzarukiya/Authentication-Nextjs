import { connect } from "@/dbConfig/dbConfig";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

connect();

export const getDataFromToken = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    console.log("token: ", token);
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    console.log("decodedToken: ", decodedToken);
    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};