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
import {
  z_updatePassword,
  z_updatePassword_type,
} from "@singhjaskaran/dhillonfitness-common";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "../ui/use-toast";
import { adminApi } from "@/store/api/adminApt";

function ChangePassword() {
  const [updatePassword, { isLoading }] = adminApi.useUpdatePasswordMutation();
  const form = useForm<z_updatePassword_type>({
    resolver: zodResolver(z_updatePassword),
    defaultValues: {
      confirmNewPassword: "",
      newPassword: "",
      prevPassword: "",
    },
  });
  const { toast } = useToast();

  async function onSubmit(values: z_updatePassword_type) {
    const { newPassword, confirmNewPassword } = values;
    if (newPassword != confirmNewPassword)
      return toast({
        description: "New password does not match with confirmed password.",
      });
    try {
      const response = await updatePassword(values).unwrap();
      if (response && response.success) {
        toast({ description: "Password has been updated successfuly." });
        form.reset();
      } else throw new Error(response.message);
    } catch (error) {
      const err = error as Error;
      toast({ description: err.message });
    }
  }

  return (
    <div className="sm:w-[40%] w-[90%] mx-auto mt-4">
      <h1 className="text-3xl font-bold mt-4 mb-4">Change Password</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 mt-7 w-full"
        >
          <FormField
            control={form.control}
            name="prevPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Previous Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="previous password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter your previous account password
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="new password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter new password fro your account
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="confirm password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Re-enter your new password for confirmation
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            {isLoading ? "Updating password..." : "Update password"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default ChangePassword;
