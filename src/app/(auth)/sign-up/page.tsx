"use client";


import { sendEmail } from "@/app/actions";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import * as z from "zod";


const SignUp = () => {



  const router = useRouter();

  const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"], // Attach the error to the confirmPassword field
  });

// Infer the TypeScript type from the schema
  type FormData = z.infer<typeof formSchema>;

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  
  const onSubmit = async (values: FormData) => {


    
    const { error } = await authClient.signUp.email({
      name: values.name, // required
      email: values.email, // required
      password: values.password, // required
    });
    
    const ResendEmail = await sendEmail();

    if (error) {
      console.error("Sign-up error:", error);
    }

    router.push("/sign-in")


  }



  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Name" {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}

        <input type="text" placeholder="email" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}

        <input type="password" placeholder="Password" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}

        <input type="password" placeholder="Confirm Password" {...register("confirmPassword")} />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

        <button type="submit" disabled={isSubmitting}>Sign Up</button>
      </form>
    </main>
  )
}

export default SignUp;