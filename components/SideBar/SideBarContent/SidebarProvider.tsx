import { SidebarContext } from "./SidebarContext";
import { useSideBarContent } from "../SideBarContent/useSideBarContent";

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const { layout, reload } = useSideBarContent();

  return (
    <SidebarContext.Provider value={{ layout, reload }}>
      {children}
    </SidebarContext.Provider>
  );
}
