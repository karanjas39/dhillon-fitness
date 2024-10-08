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
export declare const z_updateAdmin: z.ZodObject<{
    email: z.ZodString;
    name: z.ZodString;
    dailyTarget: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    email: string;
    name: string;
    dailyTarget: number;
}, {
    email: string;
    name: string;
    dailyTarget: number;
}>;
export declare const z_createUser: z.ZodEffects<z.ZodObject<{
    name: z.ZodString;
    email: z.ZodUnion<[z.ZodString, z.ZodOptional<z.ZodLiteral<"">>]>;
    dob: z.ZodOptional<z.ZodString>;
    phone: z.ZodString;
    address: z.ZodString;
    sex: z.ZodEnum<["male", "female"]>;
    membershipId: z.ZodUnion<[z.ZodString, z.ZodOptional<z.ZodLiteral<"">>]>;
    paymentAmount: z.ZodUnion<[z.ZodNumber, z.ZodOptional<z.ZodLiteral<0>>]>;
    startDate: z.ZodUnion<[z.ZodString, z.ZodOptional<z.ZodLiteral<"">>]>;
}, "strip", z.ZodTypeAny, {
    name: string;
    phone: string;
    address: string;
    sex: "male" | "female";
    email?: string | undefined;
    dob?: string | undefined;
    membershipId?: string | undefined;
    paymentAmount?: number | undefined;
    startDate?: string | undefined;
}, {
    name: string;
    phone: string;
    address: string;
    sex: "male" | "female";
    email?: string | undefined;
    dob?: string | undefined;
    membershipId?: string | undefined;
    paymentAmount?: number | undefined;
    startDate?: string | undefined;
}>, {
    name: string;
    phone: string;
    address: string;
    sex: "male" | "female";
    email?: string | undefined;
    dob?: string | undefined;
    membershipId?: string | undefined;
    paymentAmount?: number | undefined;
    startDate?: string | undefined;
}, {
    name: string;
    phone: string;
    address: string;
    sex: "male" | "female";
    email?: string | undefined;
    dob?: string | undefined;
    membershipId?: string | undefined;
    paymentAmount?: number | undefined;
    startDate?: string | undefined;
}>;
export declare const z_updateUser: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodUnion<[z.ZodString, z.ZodOptional<z.ZodLiteral<"">>]>;
    phone: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
    dob: z.ZodOptional<z.ZodString>;
    sex: z.ZodOptional<z.ZodEnum<["male", "female"]>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    email?: string | undefined;
    name?: string | undefined;
    dob?: string | undefined;
    phone?: string | undefined;
    address?: string | undefined;
    sex?: "male" | "female" | undefined;
}, {
    id: string;
    email?: string | undefined;
    name?: string | undefined;
    dob?: string | undefined;
    phone?: string | undefined;
    address?: string | undefined;
    sex?: "male" | "female" | undefined;
}>;
export declare const z_clearBalance: z.ZodObject<{
    userId: z.ZodString;
    amount: z.ZodNumber;
    type: z.ZodEnum<["refund", "payment"]>;
}, "strip", z.ZodTypeAny, {
    type: "refund" | "payment";
    userId: string;
    amount: number;
}, {
    type: "refund" | "payment";
    userId: string;
    amount: number;
}>;
export declare const z_createMembership: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    durationMonths: z.ZodNumber;
    price: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name: string;
    durationMonths: number;
    price: number;
    description?: string | undefined;
}, {
    name: string;
    durationMonths: number;
    price: number;
    description?: string | undefined;
}>;
export declare const z_userActivation: z.ZodObject<{
    userId: z.ZodString;
    active: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    userId: string;
    active: boolean;
}, {
    userId: string;
    active: boolean;
}>;
export declare const z_onlyActive: z.ZodObject<{
    onlyActive: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    onlyActive: boolean;
}, {
    onlyActive: boolean;
}>;
export declare const z_createUserMembership: z.ZodObject<{
    userId: z.ZodString;
    membershipId: z.ZodString;
    paymentAmount: z.ZodNumber;
    startDate: z.ZodString;
}, "strip", z.ZodTypeAny, {
    membershipId: string;
    paymentAmount: number;
    startDate: string;
    userId: string;
}, {
    membershipId: string;
    paymentAmount: number;
    startDate: string;
    userId: string;
}>;
export declare const z_updateUserMembership: z.ZodObject<{
    id: z.ZodString;
    membershipId: z.ZodOptional<z.ZodString>;
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
    priceAtPurchase: z.ZodOptional<z.ZodNumber>;
    paymentAmount: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    id: string;
    membershipId?: string | undefined;
    paymentAmount?: number | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    priceAtPurchase?: number | undefined;
}, {
    id: string;
    membershipId?: string | undefined;
    paymentAmount?: number | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    priceAtPurchase?: number | undefined;
}>;
export declare const z_deleteUserMembership: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    userId: string;
}, {
    id: string;
    userId: string;
}>;
export declare const z_signin: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const z_id: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export declare const z_updateMembership: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    durationMonths: z.ZodOptional<z.ZodNumber>;
    price: z.ZodOptional<z.ZodNumber>;
    active: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    id: string;
    name?: string | undefined;
    description?: string | undefined;
    durationMonths?: number | undefined;
    price?: number | undefined;
    active?: boolean | undefined;
}, {
    id: string;
    name?: string | undefined;
    description?: string | undefined;
    durationMonths?: number | undefined;
    price?: number | undefined;
    active?: boolean | undefined;
}>;
export declare const z_updatePassword: z.ZodObject<{
    newPassword: z.ZodString;
    confirmNewPassword: z.ZodOptional<z.ZodString>;
    prevPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    newPassword: string;
    prevPassword: string;
    confirmNewPassword?: string | undefined;
}, {
    newPassword: string;
    prevPassword: string;
    confirmNewPassword?: string | undefined;
}>;
export type z_createAdmin_type = z.infer<typeof z_createAdmin>;
export type z_updateAdmin_type = z.infer<typeof z_updateAdmin>;
export type z_clearBalance_type = z.infer<typeof z_clearBalance>;
export type z_userActivation_type = z.infer<typeof z_userActivation>;
export type z_updatePassword_type = z.infer<typeof z_updatePassword>;
export type z_createUser_type = z.infer<typeof z_createUser>;
export type z_updateUser_type = z.infer<typeof z_updateUser>;
export type z_createMembership_type = z.infer<typeof z_createMembership>;
export type z_deleteUserMembership_type = z.infer<typeof z_deleteUserMembership>;
export type z_updateMembership_type = z.infer<typeof z_updateMembership>;
export type z_createUserMembership_type = z.infer<typeof z_createUserMembership>;
export type z_updateUserMembership_type = z.infer<typeof z_updateUserMembership>;
export type z_signin_type = z.infer<typeof z_signin>;
export type z_id_type = z.infer<typeof z_id>;
export type z_onlyActive_type = z.infer<typeof z_onlyActive>;
