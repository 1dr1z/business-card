import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default MyApp;
