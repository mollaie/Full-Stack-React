import React from "react";
import renderer from "react-test-renderer";
import Signup from "../sign-up";

describe("sign-up test", () => {
  it("sign-up should match snapshot", () => {
    const component = renderer.create(<Signup setSignup={() => {}} />);
    console.log(component);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
