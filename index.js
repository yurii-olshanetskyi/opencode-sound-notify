import { createServerPlugin } from "@opencode/sdk/hooks";
import { execSync } from "child_process";

const DEBOUNCE_MS = 2000;
const lastPlayed = {};

function getSoundPath(sound) {
  const platformSounds = {
    darwin: `/System/Library/Sounds/${sound}.aiff`,
    linux: `/usr/share/sounds/freedesktop/stereo/${sound}.oga`,
    win32: `C:\\Windows\\Media\\${sound}.wav`,
  };
  return platformSounds[process.platform] || platformSounds.darwin;
}

function playSound(sound, type) {
  const now = Date.now();
  if (lastPlayed[type] && now - lastPlayed[type] < DEBOUNCE_MS) return;
  lastPlayed[type] = now;

  const file = getSoundPath(sound);
  const cmd =
    process.platform === "darwin"
      ? `afplay "${file}" 2>/dev/null &`
      : process.platform === "linux"
        ? `aplay "${file}" 2>/dev/null &`
        : `powershell -c (New-Object Media.SoundPlayer "${file}").PlaySync()`;

  try {
    execSync(cmd);
  } catch {}
}

export const SoundNotifyPlugin = createServerPlugin({
  name: "opencode-sound-notify",
  hooks: {
    "tui.prompt.append": [
      async () => {
        playSound("Glass", "done");
      },
    ],
  },
});

export default SoundNotifyPlugin;
