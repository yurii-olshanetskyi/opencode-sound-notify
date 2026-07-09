# Opencode Sound Notify

Play notification sounds when Opencode finishes a response — so you don't have to stare at the terminal waiting.

## Demo

When Opencode completes a response, the prompt reappears and a sound plays. If the terminal is blurred, a desktop notification fires too. No more context-switching cost.

## Requirements

- Opencode >= 1.17.0
- `afplay` (macOS, built-in), `aplay` (Linux, install `alsa-utils`), or PowerShell (Windows, built-in)

## Installation

Two approaches — use both for full coverage.

### 1) Built-in sounds (simpler, works now)

Add or merge into `~/.config/opencode/tui.json`:

```json
{
  "$schema": "https://opencode.ai/tui.json",
  "attention": {
    "enabled": true,
    "sound": true,
    "notifications": true,
    "volume": 0.4
  }
}
```

Restart Opencode. The built-in `done` event plays a notification when responses complete.

**Custom sounds per event:**

```json
{
  "attention": {
    "enabled": true,
    "sound": true,
    "notifications": true,
    "volume": 0.4,
    "sounds": {
      "done": "/path/to/your/sound.mp3",
      "error": "/path/to/error.mp3",
      "question": "/path/to/question.mp3"
    }
  }
}
```

Supported events: `default`, `done`, `error`, `question`, `permission`, `subagent_done`.

### 2) Plugin (granular control, when plugin system is available)

```bash
opencode plugin install opencode-sound-notify
```

Or install from a local checkout:

```bash
git clone https://github.com/YOUR_USER/opencode-sound-notify.git
opencode plugin install ./opencode-sound-notify
```

The plugin plays a sound on every `tui.prompt.append` event (when the prompt reappears after a response).

## Default sounds by platform

| Event    | macOS                  | Linux                                   | Windows                        |
| -------- | ---------------------- | --------------------------------------- | ------------------------------ |
| `done`   | `/System/Library/Sounds/Glass.aiff` | `/usr/share/sounds/freedesktop/stereo/complete.oga` | `C:\Windows\Media\notify.wav` |

## Configuration

### Volume

Built-in: `"volume": 0.4` (0–1) in `tui.json`.

Plugin: edit `index.js` to change the sound path or add volume control via `afplay -v 0.5`.

### Debounce

The plugin debounces sounds — max one play per sound type per 2 seconds. Prevents rapid-fire when multiple events fire.

## Project structure

```
opencode-sound-notify/
├── index.js         # Plugin entry (npm package)
├── config/
│   └── tui.json     # Built-in TUI config snippet
├── package.json     # npm package metadata
├── LICENSE          # MIT
└── README.md        # This file
```

## Contributing

PRs welcome. Ideas:

- Custom sound packs
- Volume control via plugin options
- Per-channel sounds (different tones for subagents, errors, questions)
- Integration tests

## License

MIT
