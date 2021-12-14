import Nav from "./navbar";
import Footer from "./footer";
const Layout = (props) => {
  const default_props = {
    isCreate: false,
  };

  props = { ...default_props, ...props };

  return (
    <>
      <Nav isCreate={props.isCreate} />

      <main>{props.children}</main>

      <Footer isCreate={props.isCreate} />
    </>
  );
};

export default Layout;
