import { Hono } from "hono";
import {
  CreateCustomer,
  CreateCustomerMembership,
  GetAllCustomers,
} from "../controllers/customer";

const customer = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

customer.post("/create", CreateCustomer);
customer.post("/membership/create", CreateCustomerMembership);
customer.get("/all", GetAllCustomers);

export default customer;
