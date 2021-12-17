import React from "react";
import renderer from "react-test-renderer";
import dashboard from "../dashboard";

describe("dashboard test", () => {
  it("dashboard should match snapshot", () => {
    const component = renderer.create(<dashboard />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
