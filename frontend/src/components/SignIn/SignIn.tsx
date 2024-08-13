"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z_signin, z_signin_type } from "@singhjaskaran/dhillonfitness-common";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Footer from "@/components/Footer/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "../ui/use-toast";
import { authApi } from "@/store/api/authApi";
import { useDispatch } from "react-redux";
import { setToken } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";

function SignIn() {
  const form = useForm<z_signin_type>({
    resolver: zodResolver(z_signin),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { toast } = useToast();
  const [SignIn, { isLoading }] = authApi.useSignInMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  async function onSubmit(values: z_signin_type) {
    try {
      const response = await SignIn(values).unwrap();
      if (response && response.success) {
        toast({ description: "You are successfully signedIn." });
        dispatch(setToken(response.token));
        router.push("/dashboard");
      } else throw new Error(response.message);
    } catch (error) {
      const err = error as Error;
      toast({ description: err.message, variant: "destructive" });
    }
  }

  return (
    <>
      <div className="w-[90%] sm:w-[30%] mx-auto mt-9 flex-1">
        <div className="w-full flex flex-col gap-3 items-center mb-2 bg-primary-foreground py-[50px] rounded-2xl">
          <div className="flex flex-col gap-3 px-4">
            <h1 className="font-bold text-4xl text-center">Sign In</h1>
            <p className="text-muted-foreground text-sm text-center">
              Fill account credentials to log in into your account.
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-5 mt-7 w-[80%]"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email" type="email" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter your registered email here
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter your account password here
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">
                {isLoading ? "Signing in..." : "Submit"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SignIn;
