import React from "react";
import renderer from "react-test-renderer";
import notfound from "../notfound";

describe("notfound test", () => {
  it("notfound should match snapshot", () => {
    const component = renderer.create(<notfound />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
