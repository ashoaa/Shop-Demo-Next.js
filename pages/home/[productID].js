import ProductElement from "../../src/page-elements/ProductElement";
import axios from "axios";
const ProductPage = ({ data }) => {
  return <ProductElement data={data} />;
};

export default ProductPage;

export async function getStaticPaths() {
  const products = [1, 2, 3, 4, 5];
  return {
    fallback: true,
    paths: products.map((p) => ({ params: { productID: "p" + p } })),
  };
}

export async function getStaticProps(context) {
  const id = context.params.productID;
  const response = await axios.get(
    "https://fakestoreapi.com/products/" + id.slice(1)
  );
  return { props: { data: response.data } };
}
