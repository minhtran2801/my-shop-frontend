import Slider from "rc-slider";
import { useState } from "react";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const PriceSlider = ({ handleFilters }) => {
  const [values, setValues] = useState({ sliderValues: [0, 100] });

  const handleChange = (sliderValues) => {
    setValues({ sliderValues });
    handleFilters(sliderValues);
  };

  const { sliderValues } = values;

  const marks = {
    0: <strong>$0</strong>,
    20: "$20",
    40: "$40",
    60: "$60",
    80: "$80",
    100: {
      label: <strong>$100</strong>,
    },
  };

  return (
    <Range
      min={0}
      max={100}
      step={20}
      dots
      marks={marks}
      allowCross={false}
      onChange={handleChange}
      defaultValue={sliderValues}
      tipFormatter={(value) => `$${value}`}
    />
  );
};

export default PriceSlider;
