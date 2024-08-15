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
import { TrashIcon } from "@radix-ui/react-icons";
import { useParams } from "next/navigation";

function DeleteMembership({ id, price }: { id: string; price: number }) {
  const [deleteMembership, { isLoading }] =
    customerApi.useDeleteCustomerMembershipMutation();
  const params = useParams<{ id: string }>();
  const { toast } = useToast();

  async function onContinue() {
    try {
      const response = await deleteMembership({
        id,
        userId: params.id,
      }).unwrap();
      if (response && response.success) {
        toast({
          description: "Customer membership is deleted successfuly.",
        });
      } else throw new Error(response.message);
    } catch (error) {
      const err = error as Error;
      toast({ description: err.message });
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <TrashIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will delete the membership plan
            {price != 0
              ? ` and decrease the profit
            by ${price}.`
              : "."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onContinue}>
            {isLoading ? "Deleting membership..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteMembership;
