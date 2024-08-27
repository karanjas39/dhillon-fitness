"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useToast } from "@/components/ui/use-toast";
import {
  z_createMembership,
  z_createMembership_type,
} from "@singhjaskaran/dhillonfitness-common";
import { membershipApi } from "@/store/api/membershipApi";

function CreateMembershipForm() {
  const form = useForm<z_createMembership_type>({
    resolver: zodResolver(z_createMembership),
    defaultValues: {
      description: "",
      durationMonths: 0,
      name: "",
      price: 0,
    },
  });
  const { toast } = useToast();
  const [createMembership, { isLoading }] =
    membershipApi.useCreateMembershipMutation();

  async function onSubmit(values: z_createMembership_type) {
    console.log(values);
    try {
      const response = await createMembership(values).unwrap();
      if (response && response.success) {
        toast({ description: "New membership is created successfully." });
        form.reset();
      } else throw new Error(response.message);
    } catch (error) {
      const err = error as Error;
      toast({ description: err.message });
    }
  }

  return (
    <div className="sm:w-[40%] w-[90%] mx-auto mt-4">
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
                <FormDescription>Enter membership name here</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description" type="text" {...field} />
                </FormControl>
                <FormDescription>
                  Enter membership description here (optional)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="durationMonths"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Months</FormLabel>
                <FormControl>
                  <Input placeholder="Months" type="text" {...field} />
                </FormControl>
                <FormDescription>Enter membership months here</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="Price" type="text" {...field} />
                </FormControl>
                <FormDescription>Enter membership price here</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            {isLoading ? "Creating membership..." : "Create membership"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default CreateMembershipForm;
