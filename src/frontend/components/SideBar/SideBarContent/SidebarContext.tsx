// frontend/components/SideBar/SidebarContext.ts
import { createContext } from "react";
import type { ItemProps } from "../../SideBarItem/SidebarItem";

export interface SidebarContextType {
  layout: ItemProps[];
  reload: () => void;
}

// Create context with an optional default value
export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);
