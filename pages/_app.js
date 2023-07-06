import "../styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import { StoreProvider } from "../utils/Store";
import { ThemeProvider } from "next-themes";
import NextNProgress from "nextjs-progressbar";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
    <NextNProgress />
    <StoreProvider>
      <ThemeProvider attribute="class">
        {Component.auth ? (
          <Auth adminOnly={Component.auth.adminOnly}>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </ThemeProvider>
    </StoreProvider>
  </SessionProvider>
  );
}
function Auth({ children, adminOnly }) {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/unauthorized?message=login required");
    },
  });
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (adminOnly && !session.user.isAdmin) {
    router.push("/unauthorized?message=admin login required");
  }

  return children;
}
export default MyApp;
