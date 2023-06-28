import Banner from "../components/Banner";

const NavLayout = ({ children }) => {
  return (
    <>
      <Banner />
      <main>{children}</main>
    </>
  );
};

export default NavLayout;
