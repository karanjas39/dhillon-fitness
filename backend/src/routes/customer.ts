import { Hono } from "hono";
import {
  CreateCustomer,
  CreateCustomerMembership,
  GetAllCustomers,
} from "../controllers/customer";
import { GetExpiredMemberships } from "../controllers/membership";

const customer = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

customer.post("/create", CreateCustomer);
customer.post("/membership/create", CreateCustomerMembership);
customer.get("/membership/expired", GetExpiredMemberships);
customer.get("/all", GetAllCustomers);

export default customer;
