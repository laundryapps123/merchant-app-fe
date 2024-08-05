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
import { useUpdateNote } from "../../hooks/note/useUpdateNote";

const SettingNote = () => {
  const { setTitle, setShowBackIcon, setPrevPath, setShowTitle } =
    useContext(BreadcrumbContext);
  const formSchema = z.object({
    notes: z.string().min(1, { message: "Ketentuan wajib diisi" }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notes: "1. \n2. \n3. ",
    },
  });
  const [updateNote] = useUpdateNote();

  useEffect(() => {
    setShowTitle(true);
    setTitle("Ketentuan");
    setShowBackIcon(true);
    setPrevPath("settings");
  }, []);

  const submitForm = (values: z.infer<typeof formSchema>) => {
    values.notes = generateHtmlTemplate(values.notes);

    updateNote(values);
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
              name="notes"
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
