import { useMultiStepForm } from "@/hooks/use-multi-step-from";
import type { StepFormData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import ProgressSteps from "./ProgressSteps";
import { BillingInfoStep, PersonalInfoStep, ProdessionalInfoStep } from "./steps";
import { Button } from "./ui/button";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

function MultistepFom() {
  //Custom hook
  const {
    currentStep,
    formDate,
    isFirstStep,
    isLastStep,
    isSubmitted,
    steps,
    goToNextStep,
    gotoPreviousStep,
    updateFromDate,
    submitForm,
    resetFrom,

    getCurrentStepSchema,
  } = useMultiStepForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    reset,
  } = useForm<StepFormData>({
    resolver: zodResolver(getCurrentStepSchema()),
    mode: "onChange",
    defaultValues: formDate,
  });


  useEffect(() => {
    reset(formDate);
  }, [currentStep, formDate, reset]);

  const onNext =async (data :StepFormData)=>{
        //Manule validateion check
        const isValid = await trigger();
        if(!isValid) return;//stop if validation fail

        const updateDate = {...formDate,...data};
        updateFromDate(updateDate);

        //Merge current step data with all previous data
        if(isLastStep){
          try{
            submitForm(updateDate);
          }catch(error){
            console.error("Submit fail: ",error);
          }
        }else{
          goToNextStep();
        }
  };
   const onPrevious = () => gotoPreviousStep();

    if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            {/* Success icon - green circle with checkmark */}
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>

            <h2 className="text-2xl font-semibold mb-2">Success!</h2>
            <p className="text-gray-600 mb-6">Your form has been submitted.</p>

            {/* Allow user to submit another form */}
            <Button onClick={resetFrom} className="w-full">
              Submit Another Form
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <ProgressSteps currentStep={currentStep} steps={steps}/>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentStep === 0 && <PersonalInfoStep register={register} errors={errors}/>}
          {currentStep === 1 && <ProdessionalInfoStep register={register} errors={errors} setValue={setValue}/>}
          {currentStep === 2 && <BillingInfoStep register={register} errors={errors}/>}

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onPrevious}
              disabled={isFirstStep}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>

            <Button type="button" onClick={handleSubmit(onNext)}>
              {isLastStep ? "Submit" : "Next"}
              {!isLastStep && <ChevronRight className="w-4 h-4 ml-1" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default MultistepFom;
