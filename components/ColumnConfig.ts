/**
 * This is done because tailwindcss does not recommend dynamically generating class names
 * A config approach is used as a work around
 * More info here: https://stackoverflow.com/questions/69687530/dynamically-build-classnames-in-tailwindcss/73057959#73057959
 */

export const columnLabelConfig: Record<string, string> = {
  Gray: "bg-column-gray hover:bg-column-gray",
  Brown: "bg-column-brown hover:bg-column-brown",
  Orange: "bg-column-orange hover:bg-column-orange",
  Yellow: "bg-column-yellow hover:bg-column-yellow",
  Green: "bg-column-green hover:bg-column-green",
  Blue: "bg-column-blue hover:bg-column-blue",
  Purple: "bg-column-purple hover:bg-column-purple",
  Pink: "bg-column-pink hover:bg-column-pink",
  Red: "bg-column-red hover:bg-column-red",
};

export const columnDropdownConfig: Record<string, string> = {
  Gray: "bg-column-gray",
  Brown: "bg-column-brown",
  Orange: "bg-column-orange",
  Yellow: "bg-column-yellow",
  Green: "bg-column-green",
  Blue: "bg-column-blue",
  Purple: "bg-column-purple",
  Pink: "bg-column-pink",
  Red: "bg-column-red",
};
