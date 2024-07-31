import { useContext, useEffect, useState } from "react";
import { BreadcrumbContext } from "../../../context/breadcrumb";
import { useParams } from "react-router-dom";
import { Input } from "../../../components/ui/input";
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
} from "../../../components/ui/form";
import { Dropdown } from "../../../components/ui/dropdown";
import { Button } from "../../../components/ui/button";

interface IDurationType {
  id: number;
  name: string;
}

const SettingDurationForm = () => {
  const { setTitle, setShowBackIcon, setPrevPath, setShowTitle } =
    useContext(BreadcrumbContext);
  const { id } = useParams();
  const formSchema = z.object({
    name: z.string().min(1, { message: "Nama wajib diisi" }),
    duration: z.string().min(1, { message: "Durasi wajib diisi" }),
    durationType: z.any(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      duration: "",
      durationType: "",
    },
  });
  const [durationType, setDurationType] = useState<number>(1);
  const durationTypes: IDurationType[] = [
    {
      id: 1,
      name: "Jam",
    },
    {
      id: 2,
      name: "Hari",
    },
  ];

  useEffect(() => {
    const title: string = id ? "Detail Durasi" : "Buat Durasi";

    setShowTitle(true);
    setTitle(title);
    setShowBackIcon(true);
    setPrevPath("settings/duration");
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>

                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>

          <div className="mb-3 flex gap-2">
            <div className="w-[80%]">
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Durasi</FormLabel>

                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
            </div>

            <div className="mt-[33px]">
              <FormField
                control={form.control}
                name="durationType"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <Dropdown
                        options={durationTypes}
                        optionLabel="name"
                        optionValue="id"
                        value={durationType}
                        onOptionSelected={($event) => {
                          setDurationType($event);
                          console.log($event);
                        }}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
            </div>
          </div>

          <Button className="w-full bg-watermelon-2" type="submit">
            Simpan
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SettingDurationForm;
