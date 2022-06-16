import React, { FunctionComponent } from "react";

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
}

const DisplayProfile: FunctionComponent<Props> = (props) => {
  console.log(props.profile);

  return (
    <div className="text-gray-800 text-lg text-left max-w-2xl mx-auto mt-10">
      <div className="mb-10">
        <h1 className="text-2xl font-bold">{props.profile.name}</h1>
        <p>{props.profile.bio}</p>
      </div>
      <ul>
        <li>
          <span className="font-bold">Email:</span> {props.profile.email}
        </li>
        <li>
          <span className="font-bold">Slug:</span> {props.profile.slug}
        </li>
        <li>
          <span className="font-bold">Phone:</span> {props.profile.phone}
        </li>
        <li>
          <span className="font-bold">Twitter:</span> {props.profile.twitter}
        </li>
        <li>
          <span className="font-bold">Facebook:</span> {props.profile.facebook}
        </li>
        <li>
          <span className="font-bold">Instagram:</span> {props.profile.instagram}
        </li>
      </ul>
    </div>
  );
};

export default DisplayProfile;
