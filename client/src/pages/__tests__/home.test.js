import React from "react";
import renderer from "react-test-renderer";
import home from "../home";

describe("home test", () => {
  it("home should match snapshot", () => {
    const component = renderer.create(<home />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
