// SoundSettings.tsx
"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useAudioStore } from "@/store/menu/AudioStore";

const SoundSettings = () => {
  const {
    isMusicEnabled,
    setIsMusicEnabled,
    isSoundEnabled,
    setIsSoundEnabled,
    musicVolume,
    setMusicVolume,
    soundVolume,
    setSoundVolume,
  } = useAudioStore();

  

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full bg-yellow-500 text-white font-semibold py-2 px-4 rounded hover:bg-yellow-600 transition">
          Opciones de Sonido
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configuración de Sonido</DialogTitle>
        </DialogHeader>

        <div className="flex justify-between items-center mb-4">
          <span>Música</span>
          <Switch
            checked={isMusicEnabled}
            onCheckedChange={setIsMusicEnabled}
          />
        </div>
        <div className="flex justify-between items-center mb-4">
          <span>Volumen de Música</span>
          <Slider
            value={[musicVolume * 100]}
            onValueChange={(value) => setMusicVolume(value[0] / 100)}
            max={100}
            step={1}
            className="ml-4 w-full"
          />
        </div>
        <div className="flex justify-between items-center mb-4">
          <span>Sonidos</span>
          <Switch
            checked={isSoundEnabled}
            onCheckedChange={setIsSoundEnabled}
          />
        </div>
        <div className="flex justify-between items-center mb-4">
          <span>Volumen de Sonidos</span>
          <Slider
            value={[soundVolume * 100]}
            onValueChange={(value) => setSoundVolume(value[0] / 100)}
            max={100}
            step={1}
            className="ml-4 w-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SoundSettings;
