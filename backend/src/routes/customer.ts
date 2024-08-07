import { Hono } from "hono";
import {
  CreateCustomer,
  CreateCustomerMembership,
} from "../controllers/customer";

const customer = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

customer.post("/create", CreateCustomer);
customer.post("/membership/create", CreateCustomerMembership);

export default customer;
