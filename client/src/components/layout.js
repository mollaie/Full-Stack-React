import Nav from "./navbar";
import Footer from "./footer";
const Layout = (props) => {
  const default_props = {
    isCreate: false,
  };

  props = { ...default_props, ...props };
  const handleOnCreate = () => {
    props.onCreateClicked();
  };
  return (
    <>
      <Nav isCreate={props.isCreate} />

      <main>{props.children}</main>

      <Footer isCreate={props.isCreate} onCreateClick={handleOnCreate} />
    </>
  );
};

export default Layout;
