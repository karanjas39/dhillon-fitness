"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  z_clearProductBalance,
  z_clearProductBalance_type,
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

function ClearBalanceForm({
  userId,
  productBalance,
}: {
  userId: string;
  productBalance: number;
}) {
  const form = useForm<z_clearProductBalance_type>({
    resolver: zodResolver(z_clearProductBalance),
    defaultValues: {
      userId,
    },
  });
  const [clearProductBalance, { isLoading }] =
    customerApi.useClearProductBalanceMutation();
  const { toast } = useToast();

  async function onSubmit(values: z_clearProductBalance_type) {
    try {
      if (productBalance === 0) {
        return toast({
          description: "No product balance is available to clear out.",
          variant: "destructive",
        });
      }
      if (values.amount > productBalance) {
        return toast({
          description: "Amount is greater than the current product balance.",
          variant: "destructive",
        });
      }
      const response = await clearProductBalance(values).unwrap();
      if (response.success) {
        toast({ description: "Product balance is cleared successfully." });
      }
    } catch (error) {
      console.log(error);
      toast({
        description: "Failed to clear Product balance.",
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
                Enter the amount to clear in product balance.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Clearing Balance..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}

export default ClearBalanceForm;
