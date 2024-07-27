import { useContext, useEffect } from "react";
import { BreadcrumbContext } from "../../context/breadcrumb";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";

const SettingNote = () => {
  const { setTitle, setShowBackIcon, setPrevPath, setShowTitle } =
    useContext(BreadcrumbContext);
  const formSchema = z.object({
    note: z.string().min(1, { message: "Ketentuan wajib diisi" }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      note: "",
    },
  });

  useEffect(() => {
    setShowTitle(true);
    setTitle("Ketentuan");
    setShowBackIcon(true);
    setPrevPath("settings");
  }, []);

  const submitForm = (values: z.infer<typeof formSchema>) => {
    console.log("submit", values);
  };

  return (
    <div className="mx-4 py-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitForm)}>
          <div className="mb-3">
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea id="name" rows={20} {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>

          <Button className="w-full bg-watermelon-2" type="submit">
            Simpan
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SettingNote;
