declare namespace IPAGES {
    // AdminSideBar Types
    type LucideIconName = keyof typeof import("lucide-react");

    interface SubMenuItem {
        id: string;
        label: string;
        icon: LucideIconName;
    }

    interface MenuItem {
        id: string;
        label: string;
        icon: LucideIconName;
        subItems?: SubMenuItem[];
    }

    interface MenuItemStyles {
        backgroundColor: string;
        color: string;
        border: string;
        boxShadow: string;
    }

    // AdminSideBar Constants
    const INITIAL_ACTIVE_ITEM: "user-management";
    const INITIAL_EXPANDED_MENUS: Set<string>;
    const TRANSITION_DURATION: 300;

    // AdminSideBar CSS Classes
    interface SidebarClasses {
        container: string;
        collapsed: string;
        expanded: string;
        mobile: string;
        desktop: string;
    }

    interface ButtonClasses {
        mainItem: string;
        subItem: string;
        collapse: string;
    }
}