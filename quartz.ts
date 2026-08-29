import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import * as ExternalPlugin from "./.quartz/plugins"

ExternalPlugin.FolderPage({
  sort: (first, second) => {
    const firstTitle = first.frontmatter?.title ?? ""
    const secondTitle = second.frontmatter?.title ?? ""

    return firstTitle.localeCompare(secondTitle, undefined, {
      numeric: true,
      sensitivity: "base",
    })
  },
})

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()
