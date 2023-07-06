import axios from "axios";
import cogoToast from "cogo-toast";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useReducer } from "react";
import { useForm } from "react-hook-form";
import Layout from "../../../components/Layout";
import MetaTag from "../../../components/MetaTag";
import { getError } from "../../../utils/errors";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true, errorUpdate: "" };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false, errorUpdate: "" };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };

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

const AdminProductEditScreen = () => {
  const { query } = useRouter();
  const productId = query.id;
  const [{ loading, error,  loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/posts/${productId}`);
        dispatch({ type: "FETCH_SUCCESS" });
        setValue("title", data.title);
        setValue("slug", data.slug);
        setValue("image", data.image);
        setValue("category", data.category);
        setValue("description", data.description);
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    fetchData();
  }, [productId, setValue]);

  const router = useRouter();

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

  const submitHandler = async ({
    title,
    slug,
    category,
    image,
    description,
  }) => {
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(`/api/admin/posts/${productId}`, {
        title,
        slug,
        category,
        image,
        description,
      });
      dispatch({ type: "UPDATE_SUCCESS" });
      cogoToast.success("Post updated successfully");
      router.push("/admin/posts");
    } catch (err) {
      dispatch({ type: "UPDATE_FAIL", payload: getError(err) });
      cogoToast.error(getError(err));
    }
  };
  return (
    <Layout >
       <MetaTag
      title={`Edit Post ${productId}`}
        description={"A Full Stack Developer who try to write technical blogs."}
        siteUrl={"https://next-ecomtailwin.vercel.app/"}
        previewImage={
          "https://next-ecomtailwin.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fnext-ecom-tailwind%2Fimage%2Fupload%2Fv1657406132%2Fppdbacwi02hqwbwhttjp.jpg&w=1920&q=75"
        }
      />
      <div className="grid md:grid-cols-4 md:gap-5 pt-20">
        <div>
          <ul>
            <li>
              <Link href="/admin/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/admin/orders">Orders</Link>
            </li>
            <li>
              <Link href="/admin/posts">
                <a className="font-bold">Posts</a>
              </Link>
            </li>
            <li>
              <Link href="/admin/users">Users</Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-3">
          {loading ? (
            <div>loading</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <form onSubmit={handleSubmit(submitHandler)}>
              <div className="flex justify-center">
                <div className="w-1/2 flex flex-col pb-12">
                  <h1 className="mb-4 text-xl">Create New Post</h1>

                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="blog title"
                      autoFocus
                      {...register("title", {
                        required: "Please enter title",
                      })}
                    />
                    {errors.title && (
                      <div className="text-red-500">{errors.title.message}</div>
                    )}
                  </div>

              

                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Category
                    </label>
                    <input
                      type="text"
                      id="category"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="blog category"
                      autoFocus
                      {...register("category", {
                        required: "Please enter category",
                      })}
                    />
                    {errors.category && (
                      <div className="text-red-500">
                        {errors.category.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Image
                    </label>
                    <input
                      type="text"
                      id="image"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      {...register("image", {
                        required: "Please enter image",
                      })}
                    />
                    {errors.image && (
                      <div className="text-red-500">{errors.image.message}</div>
                    )}
                  </div>

                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Upload image
                    </label>
                    <input
                      type="file"
                      id="imageFile"
                      onChange={uploadHandler}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {loadingUpload && <div>Uploading....</div>}
                  </div>

                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows="4"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="blog description..."
                      {...register("description", {
                        required: "Please enter description",
                      })}
                    >
                      {errors.description && (
                        <div className="text-red-500">
                          {errors.description.message}
                        </div>
                      )}
                    </textarea>
                  </div>

                  <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminProductEditScreen;
AdminProductEditScreen.auth = { adminOnly: true };
