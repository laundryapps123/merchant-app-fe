import { useContext, useEffect, useState } from "react";
import { BreadcrumbContext } from "../../../context/breadcrumb";
import { useParams } from "react-router-dom";
import { Input } from "../../../components/ui/input";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
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

interface IDuration {
  id: number;
  duration: string;
  price: number;
}

const SettingServiceForm = () => {
  const { setTitle, setShowBackIcon, setPrevPath, setShowTitle } =
    useContext(BreadcrumbContext);
  const { id } = useParams();
  const formSchema = z.object({
    name: z.string().min(1, { message: "Nama wajib diisi" }),
    unit: z.string().min(1, { message: "Satuan wajib diisi" }),
    duration: z.any(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      unit: "",
      duration: [
        {
          id: 1,
          duration: "",
          price: 0,
        },
      ],
    },
  });

  // const { fields, append, remove } = useFieldArray({
  //   control: form.control,
  //   name: "duration",
  // });

  useEffect(() => {
    const title: string = id ? "Detail Layanan" : "Buat Layanan";

    setShowTitle(true);
    setTitle(title);
    setShowBackIcon(true);
    setPrevPath("settings/service");
  }, []);

  const submitForm = (values: z.infer<typeof formSchema>) => {
    console.log("submit", values);
  };

  const addDuration = () => {};

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

          <div className="mb-3">
            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Satuan</FormLabel>

                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>

          <div className="mb-3 rounded border p-2">
            {/* <FormField
              control={form.control}
              name="duration"
              render={({ field }) => {
                durations.map((duration: IDuration) => (
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <FormItem>
                        <FormLabel>Durasi</FormLabel>

                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    </div>

                    <div>
                      <FormItem>
                        <FormLabel>Harga</FormLabel>

                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    </div>
                  </div>
                ));
              }}
            ></FormField> */}

            <p
              className="flex justify-end mt-2 mb-3 cursor-pointer text-watermelon-2"
              onClick={addDuration}
            >
              + Tambah Durasi
            </p>
          </div>

          <Button className="w-full bg-watermelon-2" type="submit">
            Simpan
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SettingServiceForm;
