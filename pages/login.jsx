import React, { useEffect, useReducer } from "react";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import Layout from "../components/Layout";
import { getError } from "../utils/errors";
import cogoToast from "cogo-toast";
import { useRouter } from "next/router";
import Link from "next/link";
import { blogConstant } from "../client/constants";
import TextInput from "../components/TextInput";
import InputField from "../components/InputField";

function reducer(state, action) {
  switch (action.type) {
    case blogConstant.LOGIN_REQUEST:
      return { ...state, loading: true, error: "" };
    case blogConstant.LOGIN_SUCCESS:
      return { ...state, loading: false, error: "" };
    case blogConstant.LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}

const Login = () => {
  const { data: session } = useSession();
  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });
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
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, password }) => {
    try {
      dispatch({ type: blogConstant.LOGIN_REQUEST });
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      dispatch({ type: blogConstant.LOGIN_SUCCESS });
      if (result.error) {
        cogoToast.error(result.error);
      }
    } catch (err) {
      dispatch({ type: blogConstant.UPLOAD_FAIL, payload: getError(err) });
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
            <TextInput
              fieldName="email"
              register={register}
              errors={errors}
              placeHolder="Enter Valid Email"
              isRequired={true}
              //pattern={tpattern}
              maximLength={20}
              minimLength={2}
            />

            {/* <input
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
            /> */}

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
            <div className="mb-4 ">
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5">
                Login
              </button>
            </div>

            <div className="mb-4 ">
              Don&apos;t have an account? &nbsp;
              <Link href={`/register?redirect=${redirect || "/"}`}>
                Register
              </Link>
            </div>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default Login;
