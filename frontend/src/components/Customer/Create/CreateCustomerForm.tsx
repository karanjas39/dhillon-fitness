"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  z_createUser,
  z_createUser_type,
} from "@singhjaskaran/dhillonfitness-common";
import { membershipApi } from "@/store/api/membershipApi";
import Loader from "@/components/Loader/Loader";
import { customerApi } from "@/store/api/customerApi";
import { useToast } from "@/components/ui/use-toast";
import { format, parseISO } from "date-fns";

function CreateCustomerForm() {
  const [createCustomer, { isLoading: isCreatingCustomer }] =
    customerApi.useCreateNewCustomerMutation();

  const { toast } = useToast();

  const form = useForm<z_createUser_type>({
    resolver: zodResolver(z_createUser),
    defaultValues: {
      email: "",
      address: "",
      membershipId: "",
      name: "",
      paymentAmount: 0,
      phone: "",
      sex: "male",
      dob: undefined,
      startDate: "",
    },
  });

  const { data, isLoading } = membershipApi.useGetAllMembershipIdsQuery({
    onlyActive: true,
  });

  async function onSubmit(values: z_createUser_type) {
    try {
      const response = await createCustomer(values).unwrap();
      if (response && response.success) {
        toast({ description: "New customer has been created successfuly." });
        form.reset();
      } else throw new Error(response.message);
    } catch (error) {
      const err = error as Error;
      toast({ description: err.message });
    }
  }

  if (isLoading && !data) return <Loader />;

  return (
    <div className="sm:w-[50%] w-[90%] mx-auto mt-4">
      {data?.success && data.ids.length ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5 mt-7 w-full"
          >
            <h1 className="text-3xl font-bold text-center mt-4 mb-4">
              Customer Details
            </h1>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" type="text" {...field} />
                  </FormControl>
                  <FormDescription>Enter customer name here</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>Select customer gender here</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Date of Birth"
                      type="date"
                      value={
                        field.value
                          ? format(parseISO(field.value), "yyyy-MM-dd")
                          : ""
                      }
                      onChange={(e) => {
                        const dateString = e.target.value;
                        if (dateString) {
                          const [year, month, day] = dateString.split("-");
                          const isoDate = new Date(
                            `${year}-${month}-${day}T00:00:00Z`
                          ).toISOString();
                          field.onChange(isoDate);
                        } else {
                          field.onChange(undefined);
                        }
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter customer date of birth here (optional)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" type="text" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter customer full address here
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" type="email" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter customer email here (optional)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Phone"
                      type="text"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        if (value.length <= 10) {
                          field.onChange(value);
                        }
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter customer phone number here (excluding +91)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-center mt-4 mb-4">
              <h1 className="text-3xl font-bold">Membership Details</h1>
              <p className="text-sm text-muted-foreground">
                Adding membership plan is optional here.
              </p>
            </div>
            <FormField
              control={form.control}
              name="membershipId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Membership Plan</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Membership plan" />
                      </SelectTrigger>
                      <SelectContent>
                        {data.ids.map((id) => (
                          <SelectItem
                            value={id.id}
                            key={id.id}
                            className="capitalize"
                          >
                            {id.name} ({id.price})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>Select the membership plan</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paymentAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount Paid</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Amount paid"
                      type="text"
                      min={0}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the total amount paid by customer
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Starts on</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Starts on"
                      type="date"
                      value={
                        field.value
                          ? format(parseISO(field.value), "yyyy-MM-dd")
                          : ""
                      }
                      onChange={(e) => {
                        const dateString = e.target.value;
                        if (dateString) {
                          const [year, month, day] = dateString.split("-");
                          const isoDate = new Date(
                            `${year}-${month}-${day}T00:00:00Z`
                          ).toISOString();
                          field.onChange(isoDate);
                        } else {
                          field.onChange("");
                        }
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter when the membership will start
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              {isCreatingCustomer ? "Creating customer..." : "Create customer"}
            </Button>
          </form>
        </Form>
      ) : (
        <p className="text-center text-sm text-muted-foreground">
          No membership plan is created. First create one.
        </p>
      )}
    </div>
  );
}

export default CreateCustomerForm;
