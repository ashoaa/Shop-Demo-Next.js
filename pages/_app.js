import "../styles/globalStyles.css";
import store from "../src/store/store";
import Head from "next/head";
import { Provider } from "react-redux";
import NavLayout from "../src/layout/NavLayout";
import { useRouter } from "next/router";
export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const getLayout =
    Component.getLayout || ((page) => <NavLayout>{page}</NavLayout>);
  return (
    <>
      <Head>
        <link rel="icon" href="icon-shop.png" />
        <title>Shop-Next.js {router.asPath}</title>
      </Head>
      <Provider store={store}>
        {getLayout(<Component {...pageProps} />)}
      </Provider>
    </>
  );
}
