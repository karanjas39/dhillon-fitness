"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import {
  z_updateAdmin,
  z_updateAdmin_type,
} from "@singhjaskaran/dhillonfitness-common";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Input } from "../ui/input";
import { adminApi } from "@/store/api/adminApt";
import { Button } from "../ui/button";

function GeneralSettings() {
  const [updateAdmin, { isLoading }] = adminApi.useUpdateAdminMutation();
  const admin = useSelector((state: RootState) => state.admin);
  const form = useForm<z_updateAdmin_type>({
    resolver: zodResolver(z_updateAdmin),
    defaultValues: {
      dailyTarget: admin.dailyTarget,
      email: admin.email,
      name: admin.name,
    },
  });
  const { toast } = useToast();

  async function onSubmit(values: z_updateAdmin_type) {
    try {
      const response = await updateAdmin(values).unwrap();
      if (response && response.success) {
        toast({ description: "Your details has been updated successfuly." });
      } else throw new Error(response.message);
    } catch (error) {
      const err = error as Error;
      toast({ description: err.message });
    }
  }

  return (
    <div className="sm:w-[40%] w-[90%] mx-auto mt-4">
      <h1 className="text-3xl font-bold mt-4 mb-4">Update Details</h1>
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
                  <Input placeholder="your name" type="text" {...field} />
                </FormControl>
                <FormDescription>Update your account name</FormDescription>
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
                  <Input placeholder="your email" type="text" {...field} />
                </FormControl>
                <FormDescription>Update your account email</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dailyTarget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Daily Target</FormLabel>
                <FormControl>
                  <Input
                    placeholder="your daily target"
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription>Update your daily target</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            {isLoading ? "Updating details..." : "Update details"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default GeneralSettings;
