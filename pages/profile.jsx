import React, { useEffect, useReducer } from "react";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import cogoToast from "cogo-toast";
import { getError } from "../utils/errors";
import axios from "axios";
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";

function reducer(state, action) {
  switch (action.type) {
    case "UPLOAD_REQUEST":
      return { ...state, loadingUpload: true, errorUpload: "" };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        loadingUpload: false,
        errorUpload: "",
      };
    case "UPLOAD_FAIL":
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
}

export default function ProfileScreen() {
  const { data: session } = useSession();
  const [{ loadingUpload }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("name", session.user.name);
    setValue("email", session.user.email);
    setValue("image", session.user.image);
  }, [session.user, setValue]);

  const submitHandler = async ({ name, email, image, password }) => {
    try {
      await axios.put("/api/auth/update", {
        name,
        email,
        image,
        password,
      });
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      cogoToast.success("Profile updated successfully");

      if (result.error) {
        cogoToast.error(result.err);
      }
    } catch (err) {
      cogoToast.error(getError(err));
    }
  };

  const uploadHandler = async (e, imageField = "image") => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
    try {
      dispatch({ type: "UPLOAD_REQUEST" });
      const {
        data: { signature, timestamp },
      } = await axios("/api/admin/cloudinary-sign");

      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp);
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
      const { data } = await axios.post(url, formData);
      dispatch({ type: "UPLOAD_SUCCESS" });
      setValue(imageField, data.secure_url);

      cogoToast.success("File uploaded successfully");
    } catch (err) {
      dispatch({ type: "UPLOAD_FAIL", payload: getError(err) });
      cogoToast.error(getError(err));
    }
  };

  return (
    <Layout title="Profile">
      <div className="grid md:grid-cols-4 md:gap-5 pt-20">
        <div>
          <Sidebar />
        </div>

        <div className="md:col-span-3">
          <form
            className="mx-auto max-w-screen-md"
            onSubmit={handleSubmit(submitHandler)}
          >
            <h1 className="mb-4 text-xl">Update Profile</h1>

            <div className="mb-4">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="w-full"
                id="name"
                autoFocus
                {...register("name", {
                  required: "Please enter name",
                })}
              />
              {errors.name && (
                <div className="text-red-500">{errors.name.message}</div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="w-full"
                id="email"
                {...register("email", {
                  required: "Please enter email",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                    message: "Please enter valid email",
                  },
                })}
              />
              {errors.email && (
                <div className="text-red-500">{errors.email.message}</div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="image">image</label>
              <input
                type="text"
                className="w-full"
                id="image"
                {...register("image", {
                  required: "Please enter image",
                })}
              />
              {errors.image && (
                <div className="text-red-500">{errors.image.message}</div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="imageFile">Upload image</label>
              <input
                type="file"
                className="w-full"
                id="imageFile"
                onChange={uploadHandler}
              />

              {loadingUpload && <div>Uploading....</div>}
            </div>

            <div className="mb-4">
              <label htmlFor="password">Password</label>
              <input
                className="w-full"
                type="password"
                id="password"
                {...register("password", {
                  minLength: {
                    value: 5,
                    message: "password should be  more than 4 chars",
                  },
                })}
              />
              {errors.password && (
                <div className="text-red-500 ">{errors.password.message}</div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                className="w-full"
                type="password"
                id="confirmPassword"
                {...register("confirmPassword", {
                  validate: (value) => value === getValues("password"),
                  minLength: {
                    value: 5,
                    message: "confirm password should be  more than 4 chars",
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
            </div>
            <div className="mb-4">
              <button className="primary-button">Update Profile</button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

ProfileScreen.auth = true;
