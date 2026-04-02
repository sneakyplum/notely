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
    <div className="w-full h-lvh flex bg-blue-50 items-center justify-center flex-col">
      <p className="text-4xl font-bold text-black mb-5">Sign in</p>
      <div className="w-180 h-250 flex  justify-center items-center bg-white rounded-2xl border-6 border-gray-100 shadow-lg flex-col">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col  w-full h-full items-center p-10">
        <p className="font-inter text-3xl font-bold mb-25">Notely</p>
        <label className="font-inter text-4sm items-start w-full text-black">E-mail</label>
        <input type="email" {...register("email")} className="border-2 border-gray-300 h-12 w-full rounded-sm pl-2 font-inter"/>
        <label className="font-inter text-4sm items-start w-full mt-4 text-black">Password</label>
        <input type="password" {...register("password")} className="border-2 border-gray-300 h-12 w-full rounded-sm pl-2 font-inter"/>
        <button type="submit" disabled={isSubmitting} className="font-inter text-2xl cursor-pointer p-3 w-full bg-blue-700 text-white rounded-sm mt-10">Sign In</button>

        <p className="font-inter text-3sm mt-4">Don't have an account? <a href="/sign-up" className="text-blue-700 hover:underline">Sign Up</a></p>

        <p className="mt-8">or</p>

        <button className="font-inter text-2xl cursor-pointer p-3 w-full border-2 border-gray-300 text-black rounded-sm mt-4">Sign In with Google</button>
      </form>

      </div>
    </div>
  )
}

export default SignIn;