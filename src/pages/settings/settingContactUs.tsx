import { useContext, useEffect } from "react";
import { BreadcrumbContext } from "../../context/breadcrumb";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";

const SettingContactUs = () => {
  const { setTitle, setShowBackIcon, setPrevPath, setShowTitle } =
    useContext(BreadcrumbContext);
  const formSchema = z.object({
    title: z.string().min(1, { message: "Judul wajib diisi" }),
    message: z.string().min(1, { message: "Pesan wajib diisi" }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      message: "",
    },
  });

  useEffect(() => {
    setShowTitle(true);
    setTitle("Hubungi Kami");
    setShowBackIcon(true);
    setPrevPath("settings");
  }, []);

  const submitForm = (values: z.infer<typeof formSchema>) => {
    console.log("submit", values);
  };

  return (
    <div className="mx-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitForm)}>
          <div className="mb-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Judul</FormLabel>

                  <FormControl>
                    <Input type="text" id="title" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>

          <div className="mb-3">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pesan</FormLabel>

                  <FormControl>
                    <Textarea id="message" rows={10} {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>

          <Button className="bg-watermelon-2 w-full" type="submit">
            Simpan
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SettingContactUs;
