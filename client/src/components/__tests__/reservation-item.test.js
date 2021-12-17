import React from "react";
import renderer from "react-test-renderer";
import ReservationItem from "../reservation-item";

describe("reservation-item test", () => {
  it("reservation-item should match snapshot", () => {
    const component = renderer.create(<ReservationItem />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
