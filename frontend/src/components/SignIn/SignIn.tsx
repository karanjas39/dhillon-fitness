"use client";

import Image from "next/image";
import HeroImage from "/public/hero.jpg";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "../ui/use-toast";

function SignIn() {
  const form = useForm<z_signin_type>({
    resolver: zodResolver(z_signin),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { toast } = useToast();

  function onSubmit(values: z_signin_type) {}

  return (
    <div className="w-[90%] sm:w-[50%] mx-auto my-5 grid grid-cols-1 sm:grid-cols-2 flex-1">
      <div className="flex items-center justify-center flex-col">
        <h1 className="font-bold text-3xl text-center">Sign In</h1>
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
                    Enter your registered email here.
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
                    <Input placeholder="password" type="password" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter your account password here.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
      <Image
        src={HeroImage}
        alt="Hero Image"
        className="rounded-xl hidden sm:block"
      />
    </div>
  );
}

export default SignIn;
