import HomeElement from "../../src/page-elements/HomeElement";
import axios from "axios";

const HomePage = ({ data }) => {
  return (
    <>
      <HomeElement data={data} />
    </>
  );
};

export default HomePage;

export async function getStaticProps() {
  const response = await axios.get("https://fakestoreapi.com/products/");
  return { props: { data: response.data }, revalidate: 3600 };
}
