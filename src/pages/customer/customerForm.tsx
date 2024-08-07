import { useNavigate, useParams } from "react-router-dom";
import { BreadcrumbContext } from "../../context/breadcrumb";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { z } from "zod";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { Dropdown } from "../../components/ui/dropdown";
import { IOption } from "../../types/common";

const CustomerForm = () => {
  const { setTitle, setShowBackIcon, setPrevPath, setShowTitle } =
    useContext(BreadcrumbContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const formSchema = z.object({
    name: z.string().min(1, { message: "Nama wajib diisi" }),
    phoneNumber: z.string().min(1, { message: "No HP wajib diisi" }),
    gender: z.string().min(1, { message: "Jenis Kelamin Wajib diisi" }),
    address: z.string(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      gender: "Laki-laki",
      address: "",
    },
  });
  const genres: IOption[] = [
    {
      label: "Laki-laki",
      value: "Laki-laki",
    },
    {
      label: "Perempuan",
      value: "Perempuan",
    },
  ];

  useEffect(() => {
    const title: string = id ? "Detail Pelanggan" : "Buat Pelanggan";

    setShowTitle(true);
    setTitle(title);
    setShowBackIcon(true);
    setPrevPath("/customer");

    // if (id) {
    //   populateData();
    // }
  }, []);

  const populateData = () => {
    const url: string = `${import.meta.env.VITE_API_URL}/customer/${id}`;
    axios.get(url).then((response: any) => {
      if (response) {
        form.reset(response);
      }
    });
  };

  const submitForm = (values: z.infer<typeof formSchema>) => {
    if (id) {
      const url: string = `${import.meta.env.VITE_API_URL}/customer/${id}`;
      axios.put(url, values).then(() => {
        navigate("/customer");
      });
    } else {
      const url: string = `${import.meta.env.VITE_API_URL}/customer`;
      axios.post(url, values).then(() => {
        navigate("/customer");
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

          <div className="mb-3">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No HP</FormLabel>

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
              name="gender"
              render={() => (
                <FormItem>
                  <FormLabel>Jenis Kelamin</FormLabel>

                  <FormControl>
                    <Dropdown
                      options={genres}
                      optionLabel="name"
                      optionValue="value"
                      value={form.getValues("gender")}
                      onOptionSelected={($event) => {
                        form.setValue("gender", $event);
                      }}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>

          <div className="mb-3">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat (Tidak Wajib)</FormLabel>

                  <FormControl>
                    <Textarea {...field} />
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

export default CustomerForm;
