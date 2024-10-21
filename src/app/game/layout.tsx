import { NavbarGame } from "@/components/game/NavbarGame";

export default function GameLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <div>
        <NavbarGame/>
      {children}
    </div>
  );
}