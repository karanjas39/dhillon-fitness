import { Hono } from "hono";
import {
  CreateMembership,
  deleteMembership,
  GetAllMemberships,
  GetMembershipIds,
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
membership.get("/ids", GetMembershipIds);
membership.get("/all", GetAllMemberships);

export default membership;
