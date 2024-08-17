import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { customerApi } from "@/store/api/customerApi";
import { useParams, useRouter } from "next/navigation";

function DeletCustomer() {
  const [DeletCustomer, { isLoading }] =
    customerApi.useDeleteCustomerMutation();
  const params = useParams<{ id: string }>();
  const { toast } = useToast();
  const router = useRouter();

  async function handleContinue() {
    try {
      if (!params.id) return null;
      const response = await DeletCustomer({
        id: params.id,
      }).unwrap();

      if (response && response.success) {
        toast({ description: response.message });
        router.push("/customer");
      } else throw new Error(response.message);
    } catch (error) {
      const err = error as Error;
      toast({ description: err.message });
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="max-w-max">
        <Button variant="destructive">Delete Customer</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will delete the customer permanently.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleContinue}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeletCustomer;
