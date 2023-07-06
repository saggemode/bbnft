import axios from "axios";
import cogoToast from "cogo-toast";
import { getError } from "../utils/errors";

export const signups = async (payload) => {
  try {
    const res = await axios.post("/api/auth/signup", payload);
    return res.data;
  } catch (err) {
    return cogoToast.error(getError(err));
  }
};

export const signup = async (payload) => {
  try {
    await axios.post("/api/auth/signup", payload);

    const result = await signIn("credentials", {
      redirect: false,
      payload,
    });
    cogoToast.success("User Registered successfuly");

    if (result.error) {
      return cogoToast.error(result.error);
    }
  } catch (err) {
    return cogoToast.error(getError(err));
  }
};
