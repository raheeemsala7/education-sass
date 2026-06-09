"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Loader2, PlusIcon } from "lucide-react";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConstructUrl } from "@/shared/hooks/use-construct-url";
import { useConfetti } from "@/shared/hooks/use-confetti";
import { courseSchema, SchoolGrades } from "../schema/course.schema";
import { CourseSchemaType } from "../types/course";
import { Button } from "@/shared/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import UploadCreateMedia from "@/shared/components/file-uploader/upload-create-image";
import Editor from "@/shared/components/rich-text-editor/Editor";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Input } from "@/shared/components/ui/input";
import { useCreateCourseMutation } from "../hooks/use-course";

interface IProps {
  title?: string;
  description?: string;
  thumbnail?: string;
  price?: number;
  is_free?: boolean;
  is_active?: boolean;
  category?: "الصف الأول" | "الصف الثاني" | "الصف الثالث";
  id?: string;
  isEdit: boolean;
}


const FormCreateCourse = ({ title, description, thumbnail, price, is_free, is_active, category, id, isEdit }: IProps) => {
  const { triggerConfetti } = useConfetti();

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<CourseSchemaType>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: isEdit ? title : "",
      description: isEdit ? description : "",
      thumbnail: isEdit ? thumbnail : "",
      price: isEdit ? price : 100,
      is_free: isEdit ? is_free : false,
      category: isEdit ? category : "الصف الثالث الثانوي",
      is_active: isEdit ? is_active : true,
    },
  });

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | undefined>();

  const handleSelect = (file: File) => {
    setFile(file);
    setPreview(URL.createObjectURL(file));
    form.setValue("thumbnail", file, { shouldValidate: true });
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(undefined);
    form.setValue("thumbnail", "");
  };

  const { mutateAsync: createCourse } = useCreateCourseMutation();



  // 2. Define a submit handler.
  async function onSubmit(values: CourseSchemaType) {

    console.log(values)
    try {
      startTransition(async () => {
        if (isEdit) {
          // await updateCourse({ id: id, ...values, thumbnail: thumbnailUrl })
        } else {
          const data = await createCourse(values)
     
          form.reset();
          // router.push(`/admin/courses/${data.id}/edit`);

          console.log(data)

          if (data.status) {
            router.push(`/admin/courses/${data.data.id}/edit`);
            toast.success("تم الانشاء بنجاح");
            triggerConfetti();
          }
        }


      });
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    if (isEdit) {
      form.reset({
        title,
        description,
        thumbnail,
        price,
        is_free,
      })

      setPreview(thumbnail)
      setFile(null)
    }
  }, [title, description, thumbnail, price, is_free, isEdit])

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

      <Controller
        name="title"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>

            <FieldLabel>العنوان</FieldLabel>
            <Input placeholder="عنوان الكورس" {...field} />
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <Controller
          name="category"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>

              <FieldLabel> الصف الدراسي </FieldLabel>
              <Select

                value={field.value}
                onValueChange={field.onChange}
              >

                <SelectTrigger className="w-full">

                  <SelectValue placeholder="الصف الدراسي" />
                </SelectTrigger>
                <SelectContent>

                  {SchoolGrades.options.map((category) => (
                    <SelectItem key={category} value={category}>

                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          name="is_free"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>

              <FieldLabel> هل الكورس مجاني؟ </FieldLabel>
              <Select

                value={field.value ? "true" : "false"}
                onValueChange={(value) => field.onChange(value === "true")}
              >

                <SelectTrigger className="w-full">

                  <SelectValue placeholder="اختر القيمة" />
                </SelectTrigger>
                <SelectContent>

                  <SelectItem value="true"> نعم </SelectItem>
                  <SelectItem value="false"> لا </SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          name="price"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>

              <FieldLabel>السعر</FieldLabel>
              <Input
                type="number"
                placeholder="السعر"
                value={field.value ?? ""}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          name="is_active"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>

              <FieldLabel>الحالة</FieldLabel>
              <Select

                value={field.value ? "true" : "false"}
                onValueChange={(value) => field.onChange(value === "true")}
              >

                <SelectTrigger className="w-full">

                  <SelectValue placeholder="اختر القيمة" />
                </SelectTrigger>
                <SelectContent>

                  <SelectItem value="true"> نعم </SelectItem>
                  <SelectItem value="false"> لا </SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
      </div>
      <Controller
        name="description"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>

            <FieldLabel> وصف الكورس كامل </FieldLabel>
            <Editor field={field} />
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />
      <Controller
        name="thumbnail"
        control={form.control}
        render={({ fieldState }) => (
          <Field>

            <FieldLabel> صورة غلاف الكورس </FieldLabel>
            <UploadCreateMedia
              mediaType="image"
              previewUrl={preview}
              onSelect={handleSelect}
              onRemove={handleRemove}
            />
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />
      <Button type="submit" disabled={isPending}>

        {isPending ? (
          <>

            <Loader2 className="animate-spin" /> جاري الانشاء...
          </>
        ) : (
          <>

            <PlusIcon /> انشاء الكورس
          </>
        )}
      </Button>
    </form>
  );
};

export default FormCreateCourse;
