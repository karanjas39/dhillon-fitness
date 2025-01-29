import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AddBalanceForm from "./AddBalanceForm";
import ClearBalanceForm from "./ClearBalanceForm";
function ProductBalance({
  productBalance,
  userId,
}: {
  productBalance: number;
  userId: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Product Balance</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Product Balance</DialogTitle>
          <DialogDescription>
            Here you can add and clear the user&apos;s product balance
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="add">
          <TabsList>
            <TabsTrigger value="add">Add Balance</TabsTrigger>
            <TabsTrigger value="clear">Clear Balance</TabsTrigger>
          </TabsList>
          <TabsContent value="add">
            <AddBalanceForm userId={userId} />
          </TabsContent>
          <TabsContent value="clear">
            <ClearBalanceForm userId={userId} productBalance={productBalance} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export default ProductBalance;
