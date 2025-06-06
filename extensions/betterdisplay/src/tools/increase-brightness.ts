import { availabilityBrightness, increaseBrightness } from "../commands";

type Input = {
  /**
   * The tagID of the display.
   */
  tagID: string;

  /**
   * The amount to increase the brightness by.
   * The user will most likely provide a value between 0 and 100 (percents).
   * This value should be converted to a number between 0 and 1.
   * If not provided, the default increment value will be used.
   */
  increment?: number;
};

/**
 * This command allows you to increase the brightness of a display.
 * If the command returns 'false' inform the user that the display does
 * not support brightness changes.
 */
export default async function toolIncreaseBrightness(input: Input) {
  if (!(await availabilityBrightness(input.tagID))) {
    return false;
  }

  const increment =
    typeof input.increment === "number" && input.increment >= 0 && input.increment <= 1 ? input.increment : undefined;

  try {
    return await increaseBrightness(input.tagID, increment);
  } catch (error) {
    return false;
  }
}
