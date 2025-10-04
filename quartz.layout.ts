// import { PageLayout, SharedLayout } from "./quartz/cfg"
// import * as Component from "./quartz/components"

// // components shared across all pages
// export const sharedPageComponents: SharedLayout = {
//   head: Component.Head(),
//   header: [],
//   afterBody: [],
//   footer: Component.Footer({
//     links: {
//       GitHub: "https://github.com/jackyzha0/quartz",
//       "Discord Community": "https://discord.gg/cRFFHYye7t",
//       "RSS": "/index.xml" // Add this line
//     },
//   }),
// }

// // components for pages that display a single page (e.g. a single note)
// export const defaultContentPageLayout: PageLayout = {
//   beforeBody: [
//     Component.ConditionalRender({
//       component: Component.Breadcrumbs(),
//       condition: (page) => page.fileData.slug !== "index",
//     }),
//     Component.ArticleTitle(),
//     Component.ContentMeta(),
//     Component.TagList(),
//   ],
//   left: [
//     Component.PageTitle(),
//     Component.MobileOnly(Component.Spacer()),
//     Component.Flex({
//       components: [
//         {
//           Component: Component.Search(),
//           grow: true,
//         },
//         { Component: Component.Darkmode() },
//         { Component: Component.ReaderMode() },
//       ],
//     }),
//     Component.Explorer(),
//   ],
//   right: [
//     Component.Graph(),
//     Component.DesktopOnly(Component.TableOfContents()),
//     Component.Backlinks(),
//   ],
// }

// // components for pages that display lists of pages  (e.g. tags or folders)
// export const defaultListPageLayout: PageLayout = {
//   beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
//   left: [
//     Component.PageTitle(),
//     Component.MobileOnly(Component.Spacer()),
//     Component.Flex({
//       components: [
//         {
//           Component: Component.Search(),
//           grow: true,
//         },
//         { Component: Component.Darkmode() },
//       ],
//     }),
//     Component.Explorer(),
//   ],
//   right: [],
// }


import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { SimpleSlug } from "./quartz/util/path"

const recentNotes = [
  Component.RecentNotes({
    title: "Recent Writing",
    limit: 4,
    filter: (f) =>
      f.slug!.startsWith("Posts/") && f.slug! !== "Posts/index" && !f.frontmatter?.noindex,
    linkToMore: "posts/" as SimpleSlug,
  }),
  Component.Explorer({
    title: "Notes",
    root: "Full Notes", // The folder you want to show
    // You can add more options if your Explorer component supports them
  }),
]

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [...recentNotes.map((c) => Component.MobileOnly(c))],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0",
      Twitter: "https://twitter.com/_jzhao",
    },
  }),
}

const left = [
  Component.PageTitle(),
  Component.MobileOnly(Component.Spacer()),
  Component.Flex({
    components: [
      {
        Component: Component.Search(),
        grow: true,
      },
      { Component: Component.Darkmode() },
    ],
  }),
  ...recentNotes.map((c) => Component.DesktopOnly(c)),
]

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle(), Component.ContentMeta(), Component.TagList()],
  left,
  right: [
    Component.Graph({
      localGraph: {
        showTags: false,
      },
      globalGraph: {
        showTags: false,
      },
    }),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle(), Component.ContentMeta()],
  left,
  right: [],
}