import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import postcssPresetEnv from "postcss-preset-env";

export default {
  plugins: [
    autoprefixer(),
    cssnano({ preset: "default" }),
    postcssPresetEnv({ stage: 0 }),
  ],
};
