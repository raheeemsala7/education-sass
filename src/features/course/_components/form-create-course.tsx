"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Loader2, PlusIcon } from "lucide-react";

import { useRef, useState, useTransition } from "react";
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

const FormCreateCourse = () => {
  const { triggerConfetti } = useConfetti();

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<CourseSchemaType>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
      thumbnail: "",
      price: 100,
      is_free: false,
      category: "الصف الثالث الثانوي",
      is_active: true,
    },
  });

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | undefined>();

  const handleSelect = (file: File) => {
    const localPreview = URL.createObjectURL(file);
    setFile(file);
    setPreview(localPreview);
    form.setValue("thumbnail", localPreview, {
      shouldValidate: true,
    });
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(undefined);
    form.setValue("thumbnail", "");
  };

  //   const { mutateAsync: createCourse } = useCreateCourseMutation();

  const uploadedNationalIdRef = useRef<string | null>(null);

  const uploadImageToS3 = async (file: File | null): Promise<string> => {
    try {
      if (!file) {
        return "";
      }
      // 1. احصل على presigned URL
      const presignedResponse = await fetch("/api/s3/upload", {
        method: "POST",
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
          size: file.size,
          isImage: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!presignedResponse.ok) {
        throw new Error("Failed to get presigned URL");
      }

      const { key, presignedUrl } = await presignedResponse.json();

      // 2. ارفع الملف على S3 باستخدام XMLHttpRequest
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentageCompleted = (event.loaded / event.total) * 100;
            console.log(`Upload progress: ${Math.round(percentageCompleted)}%`);
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200 || xhr.status === 204) {
            resolve();
          } else {
            reject(new Error(`Upload failed with status: ${xhr.status}`));
          }
        };

        xhr.onerror = () => {
          reject(new Error("Upload failed"));
        };

        xhr.open("PUT", presignedUrl);
        xhr.setRequestHeader("Content-Type", file.type);
        // مهم: لا تضيف headers إضافية غير Content-Type
        xhr.send(file);
      });

      return useConstructUrl(key);
    } catch (error) {
      console.error("Upload error:", error);
      throw new Error("فشل رفع الصورة");
    }
  };

  // 2. Define a submit handler.
  async function onSubmit(values: CourseSchemaType) {
    try {
      startTransition(async () => {
        let thumbnailIdKey = uploadedNationalIdRef.current;
        if (!thumbnailIdKey) {
          if (!values.thumbnail && !file) {
            toast.error("ارفع صورة الغلاف");
            return;
          }
          thumbnailIdKey = await uploadImageToS3(file);
          uploadedNationalIdRef.current = thumbnailIdKey;
        }

        // const { data } = await createCourse({
        //   ...values,
        //   thumbnail: thumbnailIdKey,
        // });

        form.reset();
        // router.push(`/admin/courses/${data.id}/edit`);
        toast.success("تم الانشاء بنجاح");
        triggerConfetti();
      });
    } catch (error) {
      console.log(error);
    }
  }

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
