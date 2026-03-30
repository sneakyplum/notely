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
      <div className="w-full h-full flex  justify-center items-center pt-30">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col border-2 border-black rounded-lg w-100 h-150  gap-4 p-10 items-center ">
          <input type="text" placeholder="Name" {...register("name")} className="border-2 border-gray-300 h-10 w-60 rounded-sm pl-2 font-sans"/>
          {errors.name && <p>{errors.name.message}</p>}

          <input type="text" placeholder="Email" {...register("email")} className="border-2 border-gray-300 h-10 w-60 rounded-sm pl-2 font-sans"/>
          {errors.email && <p>{errors.email.message}</p>}

          <input type="password" placeholder="Password" {...register("password")} className="border-2 border-gray-300 h-10 w-60 rounded-sm pl-2 font-sans"  />
          {errors.password && <p>{errors.password.message}</p>}

          <input type="password" placeholder="Confirm Password" {...register("confirmPassword")} className="border-2 border-gray-300 h-10 w-60 rounded-sm pl-2 font-sans"/>
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

          <button type="submit" disabled={isSubmitting} className="font-sans text-2xl cursor-pointer p-3 ">Sign Up</button>
        </form>

      </div>
    </main>
  )
}

export default SignUp;