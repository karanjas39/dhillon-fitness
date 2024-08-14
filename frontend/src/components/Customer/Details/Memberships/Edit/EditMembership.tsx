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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  z_updateUserMembership,
  z_updateUserMembership_type,
} from "@singhjaskaran/dhillonfitness-common";
import { format, parseISO } from "date-fns";

function EditMembership({
  startDate,
  endDate,
  id,
}: {
  startDate: string;
  endDate: string;
  id: string;
}) {
  const form = useForm<z_updateUserMembership_type>({
    resolver: zodResolver(z_updateUserMembership),
    defaultValues: {
      id,
      endDate,
      startDate,
    },
  });
  const { toast } = useToast();

  let [year, month, day] = startDate.split("-");

  async function onSubmit(values: z_updateUserMembership_type) {
    console.log(values);
    // try {
    //   const response = await clearBalance(values).unwrap();
    //   if (response && response.success) {
    //     toast({
    //       description: "Customer payment is cleared successfuly.",
    //     });
    //     form.reset();
    //   } else throw new Error(response.message);
    // } catch (error) {
    //   const err = error as Error;
    //   toast({ description: err.message });
    // }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="secondary">Edit details</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit customer membership details</DialogTitle>
          <DialogDescription>
            Update the customer membership details here
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
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="start date"
                        type="date"
                        {...field}
                        value={
                          field.value
                            ? format(parseISO(field.value), "yyyy-MM-dd")
                            : ""
                        }
                        onChange={(e) => {
                          const dateString = e.target.value;
                          if (dateString) {
                            const [year, month, day] = dateString.split("-");
                            const isoDate = new Date(
                              `${year}-${month}-${day}T00:00:00Z`
                            ).toISOString();
                            field.onChange(isoDate);
                          } else {
                            field.onChange("");
                          }
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Update the plan start date here
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="end date"
                        type="date"
                        {...field}
                        value={
                          field.value
                            ? format(parseISO(field.value), "yyyy-MM-dd")
                            : ""
                        }
                        onChange={(e) => {
                          const dateString = e.target.value;
                          if (dateString) {
                            const [year, month, day] = dateString.split("-");
                            const date = new Date(
                              `${year}-${month}-${day}T00:00:00Z`
                            );
                            date.setHours(23, 59, 59, 999);
                            const isoDate = date.toISOString();
                            field.onChange(isoDate);
                          } else {
                            field.onChange("");
                          }
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Update the plan end date here
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Update</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditMembership;
