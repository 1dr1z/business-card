import axios, { AxiosRequestConfig } from "axios";
import { useRouter } from "next/router";
import React, { Dispatch, FunctionComponent, SetStateAction } from "react";
import { useForm } from "react-hook-form";

interface Props {
  profile: {
    name: string;
    bio: string;
    slug: string;
    phone: string;
    email: string;
    facebook: string;
    twitter: string;
    instagram: string;
  };
  setEditing: Dispatch<SetStateAction<boolean>>;
}

const EditProfile: FunctionComponent<Props> = (props) => {
  const { register, handleSubmit } = useForm({
    defaultValues: props.profile,
  });
  const router = useRouter();

  const onSubmitForm = async (values: any) => {
    const config: AxiosRequestConfig = {
      url: "/api/edit-profile",
      data: values,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios(config);
    console.log(res);
    if (res.status === 200) {
      console.log(res);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-semibold text-gray-900 my-3">Edit your profile</h1>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <input
          type="text"
          placeholder="Enter your name"
          className="w-full bg-gray-200 text-gray-900 rounded-md h-12 pl-5 mb-5"
          {...register("name", { required: true })}
        />
        <textarea
          placeholder="About you"
          className="w-full bg-gray-200 text-gray-900 rounded-md h-20 pl-5 mb-5"
          {...register("bio", { required: true })}
        />
        <input
          type="text"
          placeholder="Enter your phone"
          className="w-full bg-gray-200 text-gray-900 rounded-md h-12 pl-5 mb-5"
          {...register("phone", { required: true })}
        />
        <input
          type="text"
          placeholder="Enter your twitter link"
          className="w-full bg-gray-200 text-gray-900 rounded-md h-12 pl-5 mb-5"
          {...register("twitter", { required: true })}
        />
        <input
          type="text"
          placeholder="Enter your facebook link"
          className="w-full bg-gray-200 text-gray-900 rounded-md h-12 pl-5 mb-5"
          {...register("facebook", { required: true })}
        />
        <input
          type="text"
          placeholder="Enter your instagram link"
          className="w-full bg-gray-200 text-gray-900 rounded-md h-12 pl-5 mb-5"
          {...register("instagram", { required: true })}
        />
        <button
          type="submit"
          className="bg-indigo-700 text-white rounded-md px-4 py-2 hover:bg-indigo-600 mt-4">
          Edit Profile
        </button>
      </form>
      <button
        onClick={() => props.setEditing(false)}
        type="button"
        className="bg-indigo-100 text-black rounded-md px-4 py-2 hover:bg-indigo-600 mt-4">
        Cancel
      </button>
    </div>
  );
};

export default EditProfile;
