import { billingInfoSchema, personalInfoSchema, professionalInfoSchema,type StepFormData, type Step } from "@/types";
import { Briefcase, CreditCard, User } from "lucide-react";
import { useState } from "react";


const stepSchemas = [
    personalInfoSchema,
    professionalInfoSchema,
    billingInfoSchema
];

export const steps: Step[]=[{id:"personal", name: "Personal Info"  ,icon : User},
    {id: "professional", name: "Professional Info", icon:Briefcase},
    {id: "billing", name: "Billing Info", icon:CreditCard},
];



export function useMultiStepForm(){
    const [currentStep, settCurrentStep] = useState(0);
    const [formDate,  SetFormData] = useState<Partial<StepFormData>>({});
    const [isSubmitted, setIsSubmtted] = useState(false);

    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === steps.length - 1;

    // Returen the schema for the current step

    const getCurrentStepSchema = () => stepSchemas[currentStep];

    //go to the next step
    const goToNextStep = ()=>{
        if(!isLastStep) settCurrentStep((prev)=>prev+1);
    };

    //go to Previous step
    const gotoPreviousStep = () =>{
        if(!isFirstStep) settCurrentStep((prev)=>prev - 1);
    };

    //merge and update form data
    const updateFromDate = (newDate : Partial<StepFormData>)=>{
        SetFormData((prev) =>({...prev,...newDate}));
    }

    //handel final submission
    const  submitForm = (data: StepFormData)=>{
        console.log("Final submitted data :", data);
        setIsSubmtted(true);
    };

    //reset the from entirely
    const resetFrom = ()=>{
        SetFormData({});
        settCurrentStep(0);
        setIsSubmtted(false);
    };

    return {
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
    };

}