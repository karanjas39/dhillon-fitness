import { Hono } from "hono";
import {
  CreateCustomer,
  CustomerActivation,
  GetAllCustomers,
  GetCustomerDetails,
  GetCustomerMemberships,
  RenewCustomerMembership,
  UpdateCustomer,
} from "../controllers/customer";

const customer = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

customer.post("/create", CreateCustomer);
customer.put("/update", UpdateCustomer);
customer.get("/detail/:id", GetCustomerDetails);
customer.get("/memberships/:id", GetCustomerMemberships);
customer.post("/membership/renew", RenewCustomerMembership);
customer.post("/membership/activation", CustomerActivation);
customer.get("/all", GetAllCustomers);

export default customer;
