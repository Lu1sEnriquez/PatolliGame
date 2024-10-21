import { ReactNode } from "react";
import { ThemeProvider } from "../theme/ThemeProvider";
import { SoundProvider } from "./SoundProvider";
import { Sounds } from "@/constants/sound";

interface Props {
  children: ReactNode;
}

export const Provider = ({ children }: Props) => {
  return (
    <div id="Provider">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <audio id="music" src={Sounds.MUSIC_BACKGROUND_1} loop />
        <SoundProvider>{children}</SoundProvider>
      </ThemeProvider>
    </div>
  );
};
