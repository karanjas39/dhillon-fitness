import { Hono } from "hono";
import {
  ClearUserBalance,
  CreateCustomer,
  CustomerActivation,
  DeleteCustomer,
  DeleteCustomerMembership,
  GetAllCustomers,
  GetCustomerDetails,
  GetCustomerMemberships,
  RenewCustomerMembership,
  UpdateCustomer,
  UpdateCustomerMembership,
} from "../controllers/customer";

const customer = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

customer.post("/create", CreateCustomer);
customer.put("/update", UpdateCustomer);
customer.delete("/delete", DeleteCustomer);
customer.get("/detail/:id", GetCustomerDetails);
customer.post("/balance-adjustment", ClearUserBalance);
customer.get("/memberships/:id", GetCustomerMemberships);
customer.post("/membership/renew", RenewCustomerMembership);
customer.delete("/membership/delete", DeleteCustomerMembership);
customer.patch("/membership/update", UpdateCustomerMembership);
customer.post("/activation", CustomerActivation);
customer.get("/all", GetAllCustomers);

export default customer;
