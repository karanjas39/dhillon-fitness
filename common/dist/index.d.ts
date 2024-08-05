import { z } from "zod";
export declare const z_createAdmin: z.ZodObject<{
    email: z.ZodString;
    name: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    name: string;
    password: string;
}, {
    email: string;
    name: string;
    password: string;
}>;
export declare const z_createUser: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodOptional<z.ZodString>;
    phone: z.ZodString;
    address: z.ZodString;
    sex: z.ZodEnum<["male", "female"]>;
}, "strip", z.ZodTypeAny, {
    name: string;
    phone: string;
    address: string;
    sex: "male" | "female";
    email?: string | undefined;
}, {
    name: string;
    phone: string;
    address: string;
    sex: "male" | "female";
    email?: string | undefined;
}>;
export declare const z_createMembership: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    durationDays: z.ZodNumber;
    price: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name: string;
    durationDays: number;
    price: number;
    description?: string | undefined;
}, {
    name: string;
    durationDays: number;
    price: number;
    description?: string | undefined;
}>;
export declare const z_createUserMembership: z.ZodObject<{
    userId: z.ZodString;
    membershipId: z.ZodString;
    endDate: z.ZodString;
    priceAtPurchase: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    userId: string;
    membershipId: string;
    endDate: string;
    priceAtPurchase: number;
}, {
    userId: string;
    membershipId: string;
    endDate: string;
    priceAtPurchase: number;
}>;
export type z_createAdmin_type = z.infer<typeof z_createAdmin>;
export type z_createUser_type = z.infer<typeof z_createUser>;
export type z_createMembership_type = z.infer<typeof z_createMembership>;
export type z_createUserMembership_type = z.infer<typeof z_createUserMembership>;
