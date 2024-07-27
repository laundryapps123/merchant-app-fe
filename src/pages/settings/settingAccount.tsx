import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { BreadcrumbContext } from "../../context/breadcrumb";
import { useNavigate } from "react-router-dom";
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import Cropper, { Area, Point } from "react-easy-crop";
import getCroppedImg from "../../lib/cropImage";
import uploadIcon from "../../assets/images/upload.svg";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { DialogDescription } from "@radix-ui/react-dialog";

interface ICroppedImageProps {
  imageSrc: string;
  pixelCrop: null | Area;
}

const SettingAccount = () => {
  const navigate = useNavigate();
  const { setTitle, setShowBackIcon, setPrevPath, setShowTitle } =
    useContext(BreadcrumbContext);
  const dialogTriggerEl: HTMLElement =
    document.getElementById("btn-trigger-dialog")!;
  const btnUppload: HTMLElement = document.getElementById("picture")!;
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [logo, setLogo] = useState<any>("");
  const [croppedLogo, setCroppedLogo] = useState<string>("");

  const formSchema = z.object({
    logo: z
      .any()
      .refine((file: File) => {
        console.log(file.size);
        return file;
      }, "File is required")
      .refine((file) => file.size < 5000000, "Max size is 5MB."),
    name: z.string().min(1, { message: "Nama wajib diisi" }),
    email: z
      .string()
      .min(1, { message: "Email wajib diisi" })
      .email({ message: "Alamat email tidak valid" }),
    phoneNumber: z.string().min(1, { message: "No HP wajib diisi" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      logo: "",
      name: "",
      email: "",
      phoneNumber: "",
    },
  });

  const submitForm = (values: z.infer<typeof formSchema>) => {
    console.log("submit", values);
  };

  //   const checkFileType = (file: File) => {
  //     if (file?.name) {
  //       const fileType = file.name.split(".").pop();
  //       if (fileType === "png" || fileType === "jpg" || fileType === "jpeg")
  //         return true;
  //     }
  //     return false;
  //   };

  useEffect(() => {
    setShowTitle(true);
    setTitle("Akun");
    setShowBackIcon(true);
    setPrevPath("settings");
  }, []);

  const changeLogo = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file: File = e.target.files[0];
      const img = await new Promise((resolve) => {
        let reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });

      setLogo(img);

      setTimeout(() => {
        dialogTriggerEl?.click();
      }, 1);
    }
  };

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
    console.log(croppedAreaPixels);
  };

  const createCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(logo, croppedAreaPixels, 0);
      console.log("donee", { croppedImage });
      setCroppedLogo(croppedImage as string);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="mx-4 py-4">
      <div
        className="cursor-pointer border rounded-sm p-3 mx-auto w-[10rem]"
        onClick={() => btnUppload.click()}
      >
        {croppedLogo !== "" && (
          <img className="w-auto h-auto" src={croppedLogo} alt="" />
        )}

        {croppedLogo === "" && (
          <div>
            <img className="mx-auto" src={uploadIcon} alt="upload" />
            <p className="text-center text-[10px]">Upload Logo</p>
          </div>
        )}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitForm)}>
          <div className="mb-4 hidden">
            <FormField
              control={form.control}
              name="logo"
              render={({ field: { onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="picture"
                      type="file"
                      accept="image/*"
                      onChange={(event) => changeLogo(event)}
                      {...fieldProps}
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>

                  <FormControl>
                    <Input id="name" type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>

          <div className="mb-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>

                  <FormControl>
                    <Input id="email" type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>

          <div className="mb-5">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No HP</FormLabel>

                  <FormControl>
                    <Input id="phoneNumber" type="number" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>

          <div className="flex gap-2">
            <Button variant="green" size="half" type="submit">
              Simpan
            </Button>
            <Button
              variant="blue"
              size="half"
              onClick={() => navigate("/settings/password")}
            >
              Ubah Password
            </Button>
          </div>
        </form>
      </Form>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            id="btn-trigger-dialog"
            variant="outline"
            className="hidden"
          ></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[25rem] h-[25rem]">
          <DialogHeader>
            <DialogTitle>
              <VisuallyHidden.Root></VisuallyHidden.Root>
            </DialogTitle>
            <DialogDescription>
              <VisuallyHidden.Root></VisuallyHidden.Root>
            </DialogDescription>
          </DialogHeader>
          <div className="">
            <Cropper
              image={logo ? logo : ""}
              crop={crop}
              zoom={zoom}
              aspect={6 / 3}
              style={{ containerStyle: { bottom: "60px" } }}
              onZoomChange={setZoom}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
            />
          </div>

          <DialogClose asChild>
            <Button
              className="absolute bottom-3 right-3 left-3"
              onClick={createCroppedImage}
            >
              Simpan
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SettingAccount;
