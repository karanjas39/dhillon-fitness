"use client";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  z_updateUser,
  z_updateUser_type,
} from "@singhjaskaran/dhillonfitness-common";
import { Api_CustomerDetail } from "@/utils/Types/apiTypes";
import { useToast } from "@/components/ui/use-toast";
import { customerApi } from "@/store/api/customerApi";
import { format, parseISO } from "date-fns";

function EditCustomerForm({ customer }: Pick<Api_CustomerDetail, "customer">) {
  const form = useForm<z_updateUser_type>({
    resolver: zodResolver(z_updateUser),
    defaultValues: {
      id: customer.id,
      name: customer.name,
      email: customer.email ? customer.email : "",
      address: customer.address,
      dob: customer.dob ? customer.dob : undefined,
      phone: customer.phone,
      sex:
        customer.sex === "male" || customer.sex === "female"
          ? customer.sex
          : undefined,
    },
  });
  const { toast } = useToast();
  const [updateCustomer, { isLoading }] =
    customerApi.useUpdateCustomerMutation();

  async function onSubmit(values: z_updateUser_type) {
    try {
      const response = await updateCustomer(values).unwrap();
      if (response && response.success) {
        toast({ description: "Customer has been updated successfuly." });
      } else throw new Error(response.message);
    } catch (error) {
      const err = error as Error;
      toast({ description: err.message });
    }
  }

  return (
    <div className="sm:w-[60%] w-full mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 mt-7 w-[80%]"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="name" type="text" {...field} />
                </FormControl>
                <FormDescription>Enter updated name here</FormDescription>
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
                  Update customer date of birth here (optional)
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
                  <Input placeholder="address" type="text" {...field} />
                </FormControl>
                <FormDescription>Enter updated address here</FormDescription>
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
                  <Input placeholder="email" type="email" {...field} />
                </FormControl>
                <FormDescription>Enter updated email here</FormDescription>
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
                  <Input placeholder="phone number" type="text" {...field} />
                </FormControl>
                <FormDescription>
                  Enter updated phone number here
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
                      <SelectValue placeholder="gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>Update customer gender here</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            {isLoading ? "Updating customer..." : "Update customer"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default EditCustomerForm;
