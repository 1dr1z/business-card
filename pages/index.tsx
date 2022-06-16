import { PrismaClient } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import { getSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import CreateProfile from "../components/create-profile";
import DisplayProfile from "../components/display-profile";
import EditProfile from "../components/edit-profile";

interface Session {
  expires: string;
  user: {
    email: string;
    image: string;
    name: string;
  };
}
interface Props {
  session: Session | null;
  profile: any;
}

const Home: NextPage<Props> = (props) => {
  // const { data: session } = useSession();
  const [editing, setEditing] = useState(false);

  return (
    <div>
      <Head>
        <title>Business Card Application</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {props.session && (
        <>
          Signed in as {props.session?.user?.email} <br />
          <button
            className="bg-indigo-700 text-white rounded-md px-4 py-2 hover:bg-indigo-600 mt-4"
            onClick={() => signOut()}>
            Sign out
          </button>
          {!props.profile && <CreateProfile />}
          {props.profile && !editing && (
            <div className="flex flex-col justify-center">
              <DisplayProfile profile={props.profile} />
              <button
                className="bg-indigo-700 text-white rounded-md px-4 py-2 max-w-sm mx-auto hover:bg-indigo-600 mt-4"
                onClick={() => setEditing(true)}>
                Edit profile
              </button>
            </div>
          )}
          {props.profile && editing && (
            <EditProfile profile={props.profile} setEditing={setEditing} />
          )}
        </>
      )}
      {!props.session && (
        <>
          Not signed in <br />
          <button
            onClick={() => signIn()}
            className="bg-indigo-700 text-white rounded-md px-4 py-2 hover:bg-indigo-600 mt-4">
            Sign in
          </button>
        </>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const prisma = new PrismaClient();
  const session = await getSession(ctx);
  if (!session) {
    return {
      props: {
        session: null,
      },
    };
  }
  let profile;
  if (session.user?.email) {
    profile = await prisma.profile.findUnique({
      where: { email: session?.user?.email },
      select: {
        email: true,
        facebook: true,
        instagram: true,
        phone: true,
        bio: true,
        name: true,
        twitter: true,
        slug: true,
      },
    });
  }

  return {
    props: {
      session,
      profile,
    },
  };
};

export default Home;
