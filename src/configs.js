import { ElementPropTypes } from "@volusion/element-proptypes"

export const configSchema = {
  embedInstagramURL: {
    label: "Instagram URL to embed",
    type: ElementPropTypes.string,
  },
}

export const defaultConfig = {
  embedInstagramURL: "https://www.instagram.com/p/CAyUsL3srWr",
}
