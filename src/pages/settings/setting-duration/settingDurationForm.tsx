import { useContext, useEffect } from "react";
import { BreadcrumbContext } from "../../../context/breadcrumb";
import { useNavigate, useParams } from "react-router-dom";
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
import axios from "axios";

interface IDurationType {
  id: number;
  name: string;
}

interface IDurationPayload {
  name: string;
  duration: number;
  type: string;
}

const SettingDurationForm = () => {
  const { setTitle, setShowBackIcon, setPrevPath, setShowTitle } =
    useContext(BreadcrumbContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const formSchema = z.object({
    name: z.string().min(1, { message: "Nama wajib diisi" }),
    duration: z.number().min(1, { message: "Durasi wajib diisi" }),
    type: z.string(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      duration: 0,
      type: "",
    },
  });

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

    if (id) {
      populateData();
    }
  }, []);

  const populateData = () => {
    const url: string = `${import.meta.env.VITE_API_URL}/duration/${id}`;
    axios.get(url).then((response: any) => {
      if (response) {
        form.reset(response);
      }
    });
  };

  const submitForm = (values: z.infer<typeof formSchema>) => {
    if (id) {
      const url: string = `${import.meta.env.VITE_API_URL}/duration/${id}`;
      axios.put(url, values).then(() => {
        navigate("/settings/duration");
      });
    } else {
      const url: string = `${import.meta.env.VITE_API_URL}/duration`;
      axios.post(url, values).then(() => {
        navigate("/settings/duration");
      });
    }
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
                      <Input
                        type="number"
                        onChange={($event) =>
                          form.setValue(
                            "duration",
                            Number(($event.target as HTMLInputElement).value)
                          )
                        }
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
            </div>

            <div className="mt-[33px]">
              <FormField
                control={form.control}
                name="type"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <Dropdown
                        options={durationTypes}
                        optionLabel="name"
                        optionValue="name"
                        value={form.getValues("type")}
                        onOptionSelected={($event) => {
                          form.setValue("type", $event);
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
