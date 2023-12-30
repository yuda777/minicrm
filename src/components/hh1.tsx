import React, { FC } from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type User } from "@/db/schema"

import * as z from "zod";

interface UserSchemaOptions {
  userId?: number;
}

export const createUserSchema = ({ userId }: UserSchemaOptions) => {
  return z.object({
    name: z.string().min(1, {
      message: 'Must be at least 1 character',
    }),
    parentId: z
      .string()
      .regex(/^\d+$/)
      .optional()
      .refine(data => {
        // Prevent changes if userId is 1
        return !data || data === "" || userId === 1;
      }, { message: "Cannot change" }),
    positionId: z
      .string()
      .regex(/^\d+$/)
      .optional()
      .refine(data => {
        // Prevent changes if userId is 1
        return !data || data === "" || userId === 1;
      }, { message: "Cannot change" }),
    email: z.string().email().optional().or(z.literal('')),
    hireDate: z.date().optional(),
    phoneNumber: z.string().optional(),
    statusActive: z.boolean().optional(),
    updatedAt: z.date().optional(),
    photo: z.any().optional(),
  });
};
interface FrmInputProps {
  user?: User
}
type Inputs = z.infer<ReturnType<typeof createUserSchema>>;
const AddNEditUserForm: FC<FrmInputProps> = ({ user }) => {
  const userId = user?.userId;
  // const userSchema = createUserSchema({ userId });
  const userSchema = userId ? createUserSchema({ userId }) : createUserSchema({ userId: 0 });

  const form = useForm<Inputs>({
    resolver: zodResolver(userSchema),
    mode: "onSubmit",
    defaultValues: {
      name: user?.name || "",
      parentId: String(user?.parentId) || "",
      positionId: String(user?.positionId) || "",
    }
  });

  return (
    <>
      {/* rest code */}
    </>
  );
};