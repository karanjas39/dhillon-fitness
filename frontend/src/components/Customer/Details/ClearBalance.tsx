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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  z_clearBalance,
  z_clearBalance_type,
} from "@singhjaskaran/dhillonfitness-common";
import { Input } from "@/components/ui/input";
import { customerApi } from "@/store/api/customerApi";
import { useToast } from "@/components/ui/use-toast";

function ClearBalance({
  balance,
  userId,
}: {
  balance: number;
  userId: string;
}) {
  const form = useForm<z_clearBalance_type>({
    resolver: zodResolver(z_clearBalance),
    defaultValues: {
      amount: Math.abs(balance),
      type: balance > 0 ? "refund" : "payment",
      userId,
    },
  });
  const [clearBalance, { isLoading }] =
    customerApi.useClearCustomerBalanceMutation();
  const { toast } = useToast();

  async function onSubmit(values: z_clearBalance_type) {
    try {
      const response = await clearBalance(values).unwrap();
      if (response && response.success) {
        toast({
          description: "Customer payment is cleared successfuly.",
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
        <Button onClick={() => form.reset()}>Clear Balance</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Clear customer balance</DialogTitle>
          <DialogDescription>
            Clear customer balance either its overpayment or underpayment
          </DialogDescription>
        </DialogHeader>
        <div className="w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type of payment</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Payment amount" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="refund">Refund</SelectItem>
                          <SelectItem value="payment">Payment</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      Select the suitable payment type
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {balance > 0 ? "Refund amount" : "Payment amount"}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          balance > 0 ? "refund amount" : "payment amount"
                        }
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the{" "}
                      {balance > 0 ? "amount to refund" : "payment amount"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">
                {isLoading ? "Clearing balance..." : "Submit"}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ClearBalance;
