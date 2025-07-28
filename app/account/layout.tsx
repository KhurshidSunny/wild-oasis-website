import { type PropsWithChildren } from "react"
import SideNavigation from "../_components/SideNavigation"

type AccountPageContent = PropsWithChildren

export default function Layout({children}: AccountPageContent) {
    return (
        <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
          <SideNavigation />
          <div className="py-2">{children}</div>

        </div>
    )
}