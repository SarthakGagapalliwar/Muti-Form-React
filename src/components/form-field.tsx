import type { AllFormFields, StepFormData } from "@/types";
import { Input } from "./ui/input";
import { Label } from "./ui/label"; 
// import { Label } from "@/components/ui/label";

import type { useForm } from "react-hook-form";

function FormField({
  id,
  label,
  register,
  errors,
  type = "text",
  maxLength,
}: {
  id: keyof AllFormFields;
  label: string;
  register: ReturnType<typeof useForm<StepFormData>>["register"];
  errors: Partial<Record<keyof AllFormFields, { message?: string }>>; 
  type?: string;
  maxLength?: number;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id as string}>{label}</Label> {/* ✅ htmlFor expects a string */}
      <Input id={id as string} type={type} maxLength={maxLength} {...register(id)} />
      {errors[id]?.message && (
        <p className="text-sm text-destructive">{errors[id]?.message}</p>
      )}
    </div>
  );
}

export default FormField;
