"use client";

import { Api_MembershipDetails } from "@/utils/Types/apiTypes";
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
  z_updateMembership,
  z_updateMembership_type,
} from "@singhjaskaran/dhillonfitness-common";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { membershipApi } from "@/store/api/membershipApi";

function EditMembership({
  membership,
}: Pick<Api_MembershipDetails, "membership">) {
  const form = useForm<z_updateMembership_type>({
    resolver: zodResolver(z_updateMembership),
    defaultValues: {
      active: membership.active,
      description: membership.description,
      durationDays: membership.durationDays,
      name: membership.name,
      price: membership.price,
      id: membership.id,
    },
  });
  const { toast } = useToast();
  const [updatemembership, { isLoading }] =
    membershipApi.useUpdateMembershipMutation();

  async function onSubmit(values: z_updateMembership_type) {
    try {
      const response = await updatemembership(values).unwrap();
      if (response && response.success) {
        toast({ description: "Membership is updated successfully." });
      } else throw new Error(response.message);
    } catch (error) {
      const err = error as Error;
      toast({ description: err.message });
    }
  }

  return (
    <>
      {membership && (
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
                    <FormDescription>
                      This is the membership name
                    </FormDescription>
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
                      <Input placeholder="description" type="text" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the membership description
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="durationDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Days</FormLabel>
                    <FormControl>
                      <Input placeholder="days" type="text" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the membership days span
                    </FormDescription>
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
                      <Input placeholder="price" type="text" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the membership price
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <FormLabel>Active</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </div>
                    <FormDescription>
                      This is the membership status
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">
                {isLoading ? "Updating membership..." : "Update membership"}
              </Button>
            </form>
          </Form>
        </div>
      )}
    </>
  );
}

export default EditMembership;
