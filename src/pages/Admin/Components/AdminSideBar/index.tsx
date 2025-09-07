"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Button } from "@atoms/ui/button";
import LucideIcon from "@atoms/LucideIcon";
import { COLORS } from "@constants/colors";

// Types are now defined in @types/IPages/index.d.ts

// Constants
const INITIAL_ACTIVE_ITEM = "user-management";
const INITIAL_EXPANDED_MENUS = new Set([INITIAL_ACTIVE_ITEM]);
const TRANSITION_DURATION = 300;

// CSS Classes
const SIDEBAR_CLASSES = {
  container:
    "h-full bg-gradient-to-b from-amber-50 to-orange-50 flex flex-col transition-all duration-300",
  collapsed: "w-16 p-2",
  expanded: "w-80 p-6",
  mobile: "fixed inset-y-0 left-0 z-50 w-80 p-6",
  desktop: "lg:relative lg:z-auto",
} as const;

const BUTTON_CLASSES = {
  mainItem:
    "w-full justify-start p-4 h-auto rounded-xl transition-all duration-200 hover:scale-[1.02]",
  subItem:
    "w-full justify-start p-3 h-auto rounded-lg transition-all duration-200 hover:scale-[1.01]",
  collapse:
    "h-8 w-8 rounded-lg hover:bg-orange-100 transition-colors hidden lg:flex",
} as const;

const MENU_ITEMS: IPAGES.MenuItem[] = [
  {
    id: "user-management",
    label: "Quản lý Người dùng",
    icon: "Users",
    subItems: [
      { id: "audience-info", label: "Thông tin khán giả", icon: "User" },
      { id: "scores-edit", label: "Điểm số & chỉnh sửa điểm", icon: "Star" },
      { id: "photo-submission", label: "Hòm nộp ảnh", icon: "Image" },
      {
        id: "received-letters",
        label: "Các bức thư được gửi về",
        icon: "Mail",
      },
    ],
  },
  {
    id: "content-management",
    label: "Quản lý Nội dung",
    icon: "FileText",
  },
  {
    id: "question-game-management",
    label: "Quản lý Câu hỏi & Trò chơi",
    icon: "HelpCircle",
  },
  {
    id: "statistics-reports",
    label: "Thống kê & Báo cáo",
    icon: "BarChart3",
  },
];

// Style constants
const STYLES = {
  inactive: {
    backgroundColor: "transparent",
    color: COLORS.TEXT.DARK,
    border: "none",
    boxShadow: "none",
  },
  primary: {
    backgroundColor: COLORS.BACKGROUND.ORANGE,
    color: COLORS.TEXT.LIGHT,
    border: `1px solid ${COLORS.BORDER.ORANGE}`,
    boxShadow: COLORS.BOX_SHADOW.ORANGE,
  },
  secondary: {
    backgroundColor: "#FF6B35",
    color: COLORS.TEXT.LIGHT,
    border: "1px solid #FF6B35",
    boxShadow: "0px 4px 20px rgba(255, 107, 53, 0.2)",
  },
} as const;

const AdminSideBar = () => {
  const [activeItem, setActiveItem] = useState<string>(INITIAL_ACTIVE_ITEM);
  const [activeSubItem, setActiveSubItem] = useState<string>("");
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(
    INITIAL_EXPANDED_MENUS
  );
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Memoized handlers
  const toggleMenu = useCallback((menuId: string) => {
    setExpandedMenus((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(menuId)) {
        newSet.delete(menuId);
      } else {
        newSet.add(menuId);
      }
      return newSet;
    });
  }, []);

  const handleItemClick = useCallback(
    (item: IPAGES.MenuItem) => {
      if (item.subItems) {
        toggleMenu(item.id);
        // Nếu có sub-items, set active item cha và clear sub-item
        setActiveItem(item.id);
        setActiveSubItem("");
      } else {
        // Nếu không có sub-items, set active item và clear sub-item
        setActiveItem(item.id);
        setActiveSubItem("");
      }
    },
    [toggleMenu]
  );

  const handleSubItemClick = useCallback(
    (subItemId: string, parentItemId: string) => {
      setActiveSubItem(subItemId);
      setActiveItem(parentItemId);
    },
    []
  );

  const toggleCollapse = useCallback(() => {
    setIsTransitioning(true);
    setIsCollapsed((prev) => !prev);
    setTimeout(() => setIsTransitioning(false), TRANSITION_DURATION);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  // Style generators
  const getItemStyles = useCallback(
    (item: IPAGES.MenuItem, isSubItem = false): IPAGES.MenuItemStyles => {
      const isActive = isSubItem
        ? activeSubItem === item.id
        : activeItem === item.id;

      if (!isActive) return STYLES.inactive;

      return isSubItem ? STYLES.primary : STYLES.secondary;
    },
    [activeItem, activeSubItem]
  );

  const getIconColor = useCallback(
    (item: IPAGES.MenuItem, isSubItem = false): string => {
      const isActive = isSubItem
        ? activeSubItem === item.id
        : activeItem === item.id;
      return isActive ? COLORS.TEXT.LIGHT : COLORS.TEXT.DARK;
    },
    [activeItem, activeSubItem]
  );

  // Memoized components
  const MenuIcon = useCallback(
    ({
      name,
      size,
      color,
    }: {
      name: IPAGES.LucideIconName;
      size: number;
      color: string;
    }) => <LucideIcon name={name} iconSize={size} iconColor={color} />,
    []
  );

  const SubMenuItem = useCallback(
    ({
      subItem,
      parentItemId,
    }: {
      subItem: IPAGES.SubMenuItem;
      parentItemId: string;
    }) => (
      <Button
        variant="ghost"
        className={BUTTON_CLASSES.subItem}
        style={getItemStyles(subItem as IPAGES.MenuItem, true)}
        onClick={() => handleSubItemClick(subItem.id, parentItemId)}
        title={isCollapsed ? subItem.label : undefined}
      >
        <div className="flex items-center gap-3 w-full">
          <div className="flex-shrink-0">
            <MenuIcon
              name={subItem.icon}
              size={16}
              color={getIconColor(subItem as IPAGES.MenuItem, true)}
            />
          </div>
          {!isCollapsed && !isTransitioning && (
            <span className="text-xs font-medium text-left leading-relaxed">
              {subItem.label}
            </span>
          )}
        </div>
      </Button>
    ),
    [
      getItemStyles,
      getIconColor,
      handleSubItemClick,
      MenuIcon,
      isCollapsed,
      isTransitioning,
    ]
  );

  const MainMenuItem = useCallback(
    ({ item }: { item: IPAGES.MenuItem }) => (
      <Button
        variant="ghost"
        className={BUTTON_CLASSES.mainItem}
        style={getItemStyles(item)}
        onClick={() => handleItemClick(item)}
        title={isCollapsed ? item.label : undefined}
      >
        <div className="flex items-center gap-3 w-full">
          <div className="flex-shrink-0">
            <MenuIcon name={item.icon} size={20} color={getIconColor(item)} />
          </div>
          {!isCollapsed && !isTransitioning && (
            <>
              <span className="text-sm font-medium text-left leading-relaxed flex-1">
                {item.label}
              </span>
              {item.subItems && (
                <MenuIcon
                  name={
                    expandedMenus.has(item.id) ? "ChevronUp" : "ChevronDown"
                  }
                  size={16}
                  color={getIconColor(item)}
                />
              )}
            </>
          )}
        </div>
      </Button>
    ),
    [
      getItemStyles,
      getIconColor,
      handleItemClick,
      expandedMenus,
      MenuIcon,
      isCollapsed,
      isTransitioning,
    ]
  );

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          ${SIDEBAR_CLASSES.container}
          ${isCollapsed ? SIDEBAR_CLASSES.collapsed : SIDEBAR_CLASSES.expanded}
          ${isMobileMenuOpen ? SIDEBAR_CLASSES.mobile : ""}
          ${SIDEBAR_CLASSES.desktop}
        `}
        style={{ backgroundColor: "#FEF7ED" }}
      >
        {/* Header */}
        <header className={`mb-8 ${isCollapsed ? "mb-4" : ""}`}>
          <div
            className={`flex items-center ${
              isCollapsed ? "justify-center" : "justify-between"
            }`}
          >
            {(!isCollapsed || isMobileMenuOpen) && !isTransitioning && (
              <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                Admin Dashboard
              </h1>
            )}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className={BUTTON_CLASSES.collapse}
                onClick={toggleCollapse}
                title={isCollapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"}
              >
                <MenuIcon name="Menu" size={18} color={COLORS.TEXT.DARK} />
              </Button>
            </div>
          </div>
        </header>

        {/* Menu Items */}
        <nav className="flex flex-col space-y-3 flex-1">
          {MENU_ITEMS.map((item) => (
            <div key={item.id} className="flex flex-col">
              <MainMenuItem item={item} />

              {/* Sub Menu Items */}
              {(!isCollapsed || isMobileMenuOpen) &&
                !isTransitioning &&
                item.subItems &&
                expandedMenus.has(item.id) && (
                  <div className="ml-4 mt-2 space-y-2">
                    {item.subItems.map((subItem) => (
                      <SubMenuItem
                        key={subItem.id}
                        subItem={subItem}
                        parentItemId={item.id}
                      />
                    ))}
                  </div>
                )}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};

export default AdminSideBar;
