import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import Layout from "../components/Layout";
import { getError } from "../utils/errors";
import cogoToast from "cogo-toast";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

const Create = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);


  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      cogoToast.success("User Registered successfuly");

      if (result.error) {
        cogoToast.error(result.error);
      }
    } catch (err) {
      cogoToast.error(getError(err));
    }
  };

  return (
    <Layout>
     <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="flex justify-center pt-20">
          <div className="w-1/2 flex flex-col pb-12">
            <input
              placeholder="Full Name"
              className="mt-8 border rounded p-4"
              id="name"
              autoFocus
              {...register("name", {
                required: "Please enter name",
              })}
            />
            <span>
              {errors.name && (
                <div className="text-red-500">{errors.name.message}</div>
              )}
            </span>

            <input
              placeholder="Email"
              type="email"
              id="email"
              className="mt-8 border rounded p-4"
              {...register("email", {
                required: "Please enter email",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                  message: "Please enter valid email",
                },
              })}
            />

            <span>
              {errors.email && (
                <div className="text-red-500">{errors.email.message}</div>
              )}
            </span>
            <input
              placeholder="Password"
              id="password"
              type="password"
              autoFocus
              className="mt-8 border rounded p-4 "
              {...register("password", {
                required: "Please enter password",
                minLength: {
                  value: 5,
                  message: "password should be more than 4 chars",
                },
              })}
            />
            <span>
              {errors.password && (
                <div className="text-red-500 ">{errors.password.message}</div>
              )}
            </span>

            <input
              className="mt-8 border rounded p-4 "
              type="password"
              id="confirmPassword"
              placeholder="confirm Password"
              {...register("confirmPassword", {
                required: "Please enter confirm password",
                validate: (value) => value === getValues("password"),
                minLength: {
                  value: 5,
                  message: "confirm password should be more than 4 chars",
                },
              })}
            />
            {errors.confirmPassword && (
              <div className="text-red-500 ">
                {errors.confirmPassword.message}
              </div>
            )}
            {errors.confirmPassword &&
              errors.confirmPassword.type === "validate" && (
                <div className="text-red-500 ">Password do not match</div>
              )}

            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5">
              Register
            </button>

            <div className="mb-4 ">
              Already have an account? &nbsp;
              <Link href={`/login?redirect=${redirect || "/"}`} passHref>
                Login
              </Link>
            </div>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default Create;