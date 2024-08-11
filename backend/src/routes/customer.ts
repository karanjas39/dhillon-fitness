import { Hono } from "hono";
import {
  CreateCustomer,
  DeleteCustomerMembership,
  GetAllCustomers,
  RenewCustomerMembership,
} from "../controllers/customer";
import { GetExpiredMemberships } from "../controllers/membership";

const customer = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

customer.post("/create", CreateCustomer);
customer.post("/membership/renew", RenewCustomerMembership);
customer.get("/membership/expired", GetExpiredMemberships);
customer.delete("/membership/delete", DeleteCustomerMembership);
customer.get("/all", GetAllCustomers);

export default customer;
