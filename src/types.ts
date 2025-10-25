import z from "zod";

export const personalInfoSchema = z.object({

    first : z.string().min(1,"First name is required"),
    lastName : z.string().min(1,"Last name is required"),
    email: z.string.email("Invalid emial address"),
    phone : z.string.min(10,"Invalid number must be 10"),
});

export const professionalInfoSchema =z.object({
    company: z.string().min(1,"company is required"),
    postion: z.string().min(1,"company is required"),
    experience: z.enum(.min["0-2","3-5","6-10","10+"]),
    industry:z.string().min(1,"Industry is required"),
});

export const billingInfoSchema = z.object({
    cardNumber : z.string().min(16,"Card number must be 16 digits")
    .max(16, "Card number must be 16 digits"),
    cardHolder : z.string().min(1, "CardHoder name is required"),
    expiryDate : z.string().min(4, "Invalid expiry date"),
    cvv: z.string().min(3,"Invalid CVV").max(4);
})