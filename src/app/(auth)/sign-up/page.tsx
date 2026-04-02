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
    <div className="w-full h-lvh flex bg-blue-50 items-center justify-center flex-col">
      <p className="text-4xl font-bold text-black mb-5">Sign up</p>
      <div className="w-180 h-250 flex  justify-center items-center bg-white rounded-2xl border-6 border-gray-100 shadow-lg flex-col">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col  w-full h-full items-center p-10">
          <p className="font-inter text-3xl font-bold mb-25">Notely</p>
          <label className="font-inter text-4sm items-start w-full text-black">Name</label>
          <input type="text" placeholder="Name" {...register("name")} className="border-2 border-gray-300 h-12 w-full rounded-sm pl-2 font-inter"/>
          {errors.name && <p>{errors.name.message}</p>}

          <label className="font-inter text-4sm items-start w-full mt-4 text-black">E-mail</label>
          <input type="text" placeholder="Email" {...register("email")} className="border-2 border-gray-300 h-12 w-full rounded-sm pl-2 font-inter"/>
          {errors.email && <p>{errors.email.message}</p>}

          <label className="font-inter text-4sm items-start w-full mt-4 text-black">Password</label>
          <input type="password" placeholder="Password" {...register("password")} className="border-2 border-gray-300 h-12 w-full rounded-sm pl-2 font-inter"  />
          {errors.password && <p>{errors.password.message}</p>}

          <label className="font-inter text-4sm items-start w-full mt-4 text-black">Confirm Password</label>
          <input type="password" placeholder="Confirm Password" {...register("confirmPassword")} className="border-2 border-gray-300 h-12 w-full rounded-sm pl-2 font-inter"/>
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

          <button type="submit" disabled={isSubmitting} className="font-inter text-2xl cursor-pointer p-3 w-full bg-blue-700 text-white rounded-sm mt-10">Sign Up</button>

          <p className="font-inter text-3sm mt-4">Already have an account? <a href="/sign-in" className="text-blue-700">Sign In</a></p>

        <p className="mt-8">or</p>

        <button className="font-inter text-2xl cursor-pointer p-3 w-full border-2 border-gray-300 text-black rounded-sm mt-4">Sign up with Google</button>
        </form>

      </div>

    </div>
  )
}

export default SignUp;