"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Input } from "@/components/ui/input";
import {
  z_createUserMembership,
  z_createUserMembership_type,
} from "@singhjaskaran/dhillonfitness-common";
import { customerApi } from "@/store/api/customerApi";
import { membershipApi } from "@/store/api/membershipApi";
import Loader from "@/components/Loader/Loader";
import { useToast } from "@/components/ui/use-toast";

function AddMembershipDialog({ id }: { id: string }) {
  const form = useForm<z_createUserMembership_type>({
    resolver: zodResolver(z_createUserMembership),
    defaultValues: {
      membershipId: "",
      paymentAmount: 0,
      userId: id,
    },
  });

  const [createCustomerMembership, { isLoading }] =
    customerApi.useCreateCustomerMembershipMutation();

  const { data, isLoading: isGettingIds } =
    membershipApi.useGetAllMembershipIdsQuery({
      onlyActive: true,
    });

  const { toast } = useToast();

  async function onSubmit(values: z_createUserMembership_type) {
    try {
      const response = await createCustomerMembership(values).unwrap();
      if (response && response.success) {
        toast({
          description: "Customer membership is created successfuly.",
        });
        form.reset();
      } else throw new Error(response.message);
    } catch (error) {
      const err = error as Error;
      toast({ description: err.message });
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Renew Membership</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Customer Membership</DialogTitle>
          <DialogDescription>
            Add new customer membership to existing customers here.
          </DialogDescription>
        </DialogHeader>
        {isGettingIds ? (
          <Loader />
        ) : (
          <>
            {data && data.success && data.ids.length && (
              <div className="w-full">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-5"
                  >
                    <FormField
                      control={form.control}
                      name="membershipId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Membership plan</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
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
                          <FormDescription>
                            Select the suitable memebrship plan
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="paymentAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Amount paid</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="amount paid"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Enter amount paid by customer
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">
                      {isLoading
                        ? "Creating membership..."
                        : "Create membership"}
                    </Button>
                  </form>
                </Form>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default AddMembershipDialog;
