import { type ReactElement } from "react"
import RenderHTML, { type HTMLSource } from "react-native-render-html"

interface WordProps {
  contentWidth: number
  source: HTMLSource 
}

export default function Word({ contentWidth, source}: WordProps): ReactElement {
  return (
    <RenderHTML
      contentWidth={contentWidth}
      source={source}
      baseStyle={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "1.25rem" }}
      tagsStyles={{ h1: { color: "#ffffff" } }}
    />
  )
}
