"use client";




import { authClient } from "@/lib/auth-client";

import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";




const SignIn =  () => {

  const router = useRouter();

  const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),

  });

// Infer the TypeScript type from the schema
  type FormData = z.infer<typeof formSchema>;

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });



  const onSubmit = async (formData: FormData) => {



const { data, error } = await authClient.signIn.email({
        /**
         * The user email
         */
        email: formData.email,
        /**
         * The user password
         */
        password: formData.password,
        /**
         * A URL to redirect to after the user verifies their email (optional)
         */
        callbackURL: "/dashboard",
        /**
         * remember the user session after the browser is closed. 
         * @default true
         */
        rememberMe: false
}, {
    //callbacks
})
  }

  console.log(onSubmit)


  return (
    <div className="w-full h-full flex">
      <div className="w-full h-full flex  justify-center items-center pt-30">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col  w-100 h-150 items-center ">
        <p className="font-serif text-3xl font-bold">Notely</p>
        <label className="font-serif text-4sm items-start w-full">E-mail</label>
        <input type="email" {...register("email")} className="border-2 border-gray-300 h-12 w-full rounded-sm pl-2 font-serif"/>
        <label className="font-serif text-4sm items-start w-full mt-4">Password</label>
        <input type="password" {...register("password")} className="border-2 border-gray-300 h-12 w-full rounded-sm pl-2 font-serif"/>
        <button type="submit" disabled={isSubmitting} className="font-serif text-2xl cursor-pointer p-3 w-full bg-blue-700 text-white rounded-sm mt-10">Sign In</button>

        <p className="font-serif text-3sm mt-4">Don't have an account? <a href="/sign-up" className="text-blue-700">Sign Up</a></p>
      </form>

      </div>
    </div>
  )
}

export default SignIn;