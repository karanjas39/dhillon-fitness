"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  z_addProductBalance,
  z_addProductBalance_type,
} from "@singhjaskaran/dhillonfitness-common";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { customerApi } from "@/store/api/customerApi";
import { useToast } from "@/components/ui/use-toast";

function AddBalanceForm({ userId }: { userId: string }) {
  const form = useForm<z_addProductBalance_type>({
    resolver: zodResolver(z_addProductBalance),
    defaultValues: {
      userId,
    },
  });
  const [addProductBalance, { isLoading }] =
    customerApi.useAddProductBalanceMutation();
  const { toast } = useToast();

  async function onSubmit(values: z_addProductBalance_type) {
    try {
      const response = await addProductBalance(values).unwrap();
      if (response.success) {
        toast({ description: "Product balance is added successfully." });
      }
    } catch (error) {
      console.log(error);
      toast({
        description: "Failed to add Product balance.",
        variant: "destructive",
      });
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 mt-3"
      >
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input placeholder="amount" {...field} type="number" min={0} />
              </FormControl>
              <FormDescription>
                Enter the amount to add in product balance.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Adding Balance..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}

export default AddBalanceForm;
