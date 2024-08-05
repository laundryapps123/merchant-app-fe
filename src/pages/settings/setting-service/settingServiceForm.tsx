import { useContext, useEffect, useState } from "react";
import { BreadcrumbContext } from "../../../context/breadcrumb";
import { useNavigate, useParams } from "react-router-dom";
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
import deleteIcon from "../../../assets/images/trash.svg";
import axios from "axios";

interface IDuration {
  id: string;
  name: number;
}

const SettingServiceForm = () => {
  const { setTitle, setShowBackIcon, setPrevPath, setShowTitle } =
    useContext(BreadcrumbContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const formSchema = z.object({
    name: z.string().min(1, { message: "Nama wajib diisi" }),
    satuan: z.string().min(1, { message: "Satuan wajib diisi" }),
    durations: z.array(
      z.object({
        duration: z.string().min(1, { message: "Durasi wajib diisi" }),
        price: z.number().min(1, { message: "Harga wajib diisi" }),
      })
    ),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      satuan: "",
      durations: [
        {
          duration: "",
          price: 0,
        },
      ],
    },
  });
  const [durations, setDurations] = useState<IDuration[]>([]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "durations",
  });

  useEffect(() => {
    const title: string = id ? "Detail Layanan" : "Buat Layanan";

    setShowTitle(true);
    setTitle(title);
    setShowBackIcon(true);
    setPrevPath("settings/service");
    getDurations();
  }, []);

  const submitForm = (values: z.infer<typeof formSchema>) => {
    if (id) {
      const url: string = `${import.meta.env.VITE_API_URL}/service/${id}`;
      axios.put(url, values).then(() => {
        navigate("/settings/service");
      });
    } else {
      const url: string = `${import.meta.env.VITE_API_URL}/service`;
      axios.post(url, values).then(() => {
        navigate("/settings/service");
      });
    }
  };

  const addDuration = () => {
    append({
      duration: "",
      price: 0,
    });
  };

  const removeDuration = (id: number) => {
    remove(id);
  };

  const getDurations = () => {
    const url: string = `${import.meta.env.VITE_API_URL}/duration`;
    axios.get(url).then((res: any) => {
      setDurations(res);
    });
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

          <div className="mb-3">
            <FormField
              control={form.control}
              name="satuan"
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
            <div
              className={`grid grid-cols-2 gap-2 mb-2  ${
                fields.length > 1 ? "w-[90%]" : "w-full"
              }`}
            >
              <label htmlFor="" className="text-sm">
                Durasi
              </label>
              <label htmlFor="" className="text-sm">
                Harga
              </label>
            </div>

            {fields.map((parentField: any, index: number) => (
              <div key={index} className="flex justify-between">
                <div
                  key={parentField.id}
                  className={`grid grid-cols-2 gap-2 mb-2 ${
                    fields.length > 1 ? "w-[90%]" : "w-full"
                  } `}
                >
                  <FormField
                    control={form.control}
                    name={`durations.${index}.duration`}
                    render={() => (
                      <div>
                        <FormItem>
                          <FormControl>
                            <Dropdown
                              options={durations}
                              optionLabel="name"
                              optionValue="id"
                              value={form.getValues(
                                `durations.${index}.duration`
                              )}
                              onOptionSelected={($event) => {
                                form.setValue(
                                  `durations.${index}.duration`,
                                  $event
                                );
                              }}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      </div>
                    )}
                  ></FormField>

                  <FormField
                    control={form.control}
                    name={`durations.${index}.price`}
                    render={() => (
                      <div>
                        <FormItem>
                          <FormControl>
                            <Input
                              type="number"
                              onChange={($event: any) =>
                                form.setValue(
                                  `durations.${index}.price`,
                                  Number(
                                    ($event.target as HTMLInputElement).value
                                  )
                                )
                              }
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      </div>
                    )}
                  ></FormField>
                </div>

                {fields.length > 1 && (
                  <img
                    src={deleteIcon}
                    alt="delete"
                    className="cursor-pointer m-auto w-5"
                    onClick={() => removeDuration(index)}
                  />
                )}
              </div>
            ))}

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
