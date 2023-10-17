import React, { PropsWithChildren } from "react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Inter } from "next/font/google";

import { StyleSheetManager, createGlobalStyle } from "styled-components";
import { useRouter } from "next/router";
import Layout from "./app/layout";
import { useAuthorization } from "../hooks/store/useAuthorization";

const inter = Inter({ subsets: ["latin"], variable: "--inter-font" });

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    font-family: var(--inter-font); 
  }
`;
const NoLayout = ({ children }: PropsWithChildren<unknown>) => children;

function MyApp({ Component, pageProps }: AppProps) {
  const { user } = useAuthorization();
  const [queryClient] = React.useState(() => new QueryClient());
  const router = useRouter();
  const CurrentLayout = router.pathname.startsWith("/app") ? Layout : NoLayout;
  return (
    <main className={inter.className}>
      <StyleSheetManager shouldForwardProp={(prop) => prop !== "sx"}>
        <QueryClientProvider client={queryClient}>
          <CurrentLayout>
            <GlobalStyle />
            <Component {...pageProps} />
          </CurrentLayout>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </StyleSheetManager>
    </main>
  );
}

export default MyApp;
