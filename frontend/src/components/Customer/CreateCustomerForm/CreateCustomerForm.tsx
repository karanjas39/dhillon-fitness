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

function CreateCustomerForm() {
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
    },
  });
  const { data, isLoading } = membershipApi.useGetAllMembershipIdsQuery();

  function onSubmit(values: z_createUser_type) {
    console.log(values);
  }

  if (isLoading && !data) return <Loader />;

  return (
    <div className="sm:w-[40%] w-[90%] mx-auto mt-4">
      {data?.success && data.ids.length && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5 mt-7 w-full"
          >
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
                    <Input placeholder="Phone" type="text" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter customer phone number here (excluding +91)
                  </FormDescription>
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
                          <SelectItem value={id.id} key={id.id}>
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
            <Button type="submit">Create</Button>
          </form>
        </Form>
      )}
    </div>
  );
}

export default CreateCustomerForm;
