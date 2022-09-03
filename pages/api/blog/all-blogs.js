import connectMongo from "../../../database/conn";
import { getAllBlogs } from "../../../database/controller";
export default async function handler(req, res) {
  //Checking weather user is authorized

  connectMongo();

  const { method } = req;

  if (method === "GET") {
    await getAllBlogs(req, res);
  }
}
