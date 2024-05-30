import { Sidebar as FBSidebar } from "flowbite-react";
import NAV_ITEMS from "../navItems";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDrawerIsOpen, setSidebarActive, setSidebarCollapseOpen } from "../store/slices/sidebar";

export default function Sidebar() {
    const sidebarActive = useSelector(state => state.sidebar.sidebarActive)
    const sidebarCollapseopen = useSelector(state => state.sidebar.collapseOpen)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleMenuClick(path, active, collapseName = "") {
        navigate(path)
        dispatch(setDrawerIsOpen(false))
        dispatch(setSidebarActive(active))
        dispatch(setSidebarCollapseOpen(collapseName))
    }

    return (
        <FBSidebar>
            <FBSidebar.Items className="flex flex-col h-full justify-between">
                <FBSidebar.ItemGroup className="overflow-y-auto">
                    {
                        NAV_ITEMS.map(({ path, name, ...rest }, idx) => ('children' in rest ? (
                            <FBSidebar.Collapse key={idx} open={sidebarCollapseopen === name} icon={rest.icon} label={name}>
                                {
                                    rest.children.map((child, childIdx) => (
                                        <div key={childIdx} onClick={() => handleMenuClick(child.path, child.name, name)} className="cursor-pointer">
                                            <FBSidebar.Item active={child.name === sidebarActive} {...child}>{child.name}</FBSidebar.Item>
                                        </div>
                                    ))
                                }
                            </FBSidebar.Collapse>
                        ) : (
                            <div key={idx} onClick={() => handleMenuClick(path, name)} className="cursor-pointer">
                                <FBSidebar.Item active={name === sidebarActive} {...rest}>
                                    {name}
                                </FBSidebar.Item>
                            </div>
                        )
                        ))
                    }
                </FBSidebar.ItemGroup>
                <FBSidebar.ItemGroup className="hidden md:block">
                    <code className="text-xs">&copy; {new Date().getFullYear()} padp721</code>
                </FBSidebar.ItemGroup>
            </FBSidebar.Items>
        </FBSidebar>
    )
}