import { Hono } from "hono";
import {
  CreateMembership,
  deleteMembership,
  GetAllMemberships,
  GetMembershipById,
  UpdateMembership,
} from "../controllers/membership";

const membership = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

membership.post("/create", CreateMembership);
membership.put("/update", UpdateMembership);
membership.delete("/delete", deleteMembership);
membership.get("/ids", GetAllMemberships);
membership.get("/detail/:id", GetMembershipById);

export default membership;
