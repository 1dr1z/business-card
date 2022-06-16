import { PrismaClient } from "@prisma/client";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import DisplayProfile from "../../components/display-profile";

const ProfilePage: NextPage<any> = (props) => {
  const router = useRouter();
  console.log(props.profile);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center mt-20">
      <div className="w-fit rounded-full overflow-hidden border-2 border-gray-800">
        <Image
          src={props.profile.user.image}
          alt={props.profile.name}
          width={200}
          height={200}
          quality={100}
        />
      </div>
      <DisplayProfile profile={props.profile} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context: any) => {
  const prisma = new PrismaClient();
  const slug = context.params.slug;
  const profile = await prisma.profile.findFirst({
    where: { slug: slug },
    include: { user: true },
  });

  return {
    props: {
      profile: profile,
    },
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default ProfilePage;
