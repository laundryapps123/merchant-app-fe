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
      note: "1. \n2. \n3. ",
    },
  });

  useEffect(() => {
    setShowTitle(true);
    setTitle("Ketentuan");
    setShowBackIcon(true);
    setPrevPath("settings");
  }, []);

  const submitForm = (values: z.infer<typeof formSchema>) => {
    values.note = generateHtmlTemplate(values.note);
    console.log("submit", values);
  };

  const escapeRegExp = (str: string) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
  };

  const replaceAll = (str: string, find: string, replace: string) => {
    return str.replace(new RegExp(escapeRegExp(find), "g"), replace);
  };

  const generateHtmlTemplate = (value: string) => {
    const list: string[] = value.split("\n");

    return replaceAll(
      `<ol>
      ${list.map((singleList: string) => "<li>" + singleList + "</li>")}
    </ol>`,
      ",",
      ""
    );
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

          <div id="preview"></div>

          <Button className="w-full bg-watermelon-2" type="submit">
            Simpan
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SettingNote;
