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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="email" placeholder="email" {...register("email")}/>
        <input type="password" placeholder="password" {...register("password")}/>
        <button type="submit" disabled={isSubmitting}>Sign In</button>
      </form>
    </div>
  )
}

export default SignIn;