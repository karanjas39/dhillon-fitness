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
import { useParams } from "next/navigation";

function CustomerActivation({ active }: { active: boolean }) {
  const [CustomerActivation, { isLoading }] =
    customerApi.useCustomerActivationMutation();
  const params = useParams<{ id: string }>();
  const { toast } = useToast();

  async function handleContinue() {
    try {
      if (!params.id) return null;
      const response = await CustomerActivation({
        active: !active,
        userId: params.id,
      }).unwrap();

      if (response && response.success) {
        toast({ description: response.message });
      } else throw new Error(response.message);
    } catch (error) {
      const err = error as Error;
      toast({ description: err.message });
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="max-w-max">
        <Button variant={active ? "destructive" : "default"}>
          {active ? "Deactive Customer" : "Activate customer"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will {active ? "deactivate" : "activate"} this customer.
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

export default CustomerActivation;
