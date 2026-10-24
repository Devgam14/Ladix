# Ladix

A desktop video tool that downloads videos from YouTube and plays them back inside the same app. Download, organize and watch in one place, with no browser and no command line.

Built with **Tauri (Rust backend)** and **yt-dlp** for downloading, with **ffmpeg** for merging and converting.

> Only download content you own, that is licensed for reuse (e.g. Creative Commons), or that you have permission to save.

---

## Goals

- Paste a link and get the highest quality version saved locally.
- Watch downloaded videos in a built-in player.
- Keep a searchable library of everything downloaded.
- Stay light and fast on modest hardware.

## Non-goals (for now)

- Cloud sync or accounts
- Downloading from sites other than YouTube
- Mobile apps

---

## Tech stack

| Layer       | Choice                                        | Why                                               |
| ----------- | --------------------------------------------- | ------------------------------------------------- |
| App shell   | Tauri v2                                      | Small binary, Rust backend, native webview        |
| Backend     | Rust                                          | Process control, file handling, events            |
| Downloader  | yt-dlp (sidecar binary)                       | Best-maintained YouTube extractor                 |
| Media tools | ffmpeg                                        | Merge streams, convert, extract audio, thumbnails |
| Frontend    | React + TypeScript (or vanilla)               | Fast UI iteration                                 |
| Storage     | SQLite (via `rusqlite` or `tauri-plugin-sql`) | Library metadata and history                      |
| Player      | HTML5 `<video>` first, mpv as an upgrade      | See "Playback notes"                              |

## Architecture

```
Frontend (UI)
   |  invoke() commands          ^ events (progress, done, error)
   v                             |
Tauri backend (Rust)
   |-- download manager (queue, concurrency, cancel/pause)
   |-- yt-dlp runner (spawn process, parse progress output)
   |-- ffmpeg runner (thumbnails, convert)
   |-- library (SQLite: videos, tags, history)
   `-- file store (downloads folder)
```

Key idea: the Rust side spawns `yt-dlp` with `--newline --progress-template` (or `--dump-json`), parses the output line by line, and emits Tauri events to the UI.

## Project layout (planned)

```
ladix/
|-- src/                 # frontend
|-- src-tauri/
|   |-- src/
|   |   |-- main.rs
|   |   |-- downloader.rs
|   |   |-- library.rs
|   |   `-- commands.rs
|   |-- Cargo.toml
|   `-- tauri.conf.json
|-- package.json
`-- README.md
```

---

## Features

### MVP (v0.1): "paste, download, watch"

- [ ] Paste a URL and fetch video info (title, thumbnail, duration, channel)
- [ ] Download at best quality into a downloads folder
- [ ] Live progress bar with speed and ETA
- [ ] Built-in video player for downloaded files
- [ ] Simple library grid showing thumbnails and titles
- [ ] Open file location and delete from library

### v0.2: "make it comfortable"

- [ ] Quality and format picker (best, 1080p, 720p, audio only)
- [ ] Download queue with several items and a concurrency limit
- [ ] Cancel, pause and resume downloads
- [ ] Playlist support (pick which videos to download)
- [ ] Audio-only mode (mp3, m4a, opus) with a music-style player
- [ ] Error messages that make sense (private video, age-restricted, network drop)
- [ ] Settings page: downloads folder, default quality, filename template
- [ ] Remember playback position per video

### v0.3: "library and player"

- [ ] Search and filter the library (title, channel, tags, date)
- [ ] Tags, favorites and custom collections
- [ ] Sort by date, size, duration, channel
- [ ] Player extras: speed control, keyboard shortcuts, picture-in-picture, fullscreen
- [ ] Subtitle download and display (choose language)
- [ ] Chapters from the video shown on the seek bar
- [ ] Watched/unwatched markers and "continue watching" row
- [ ] Duplicate detection (already downloaded this video)

### Ideas pool (pick what excites you)

**Downloading**

- Clipboard watcher: detect a copied YouTube link and offer to download
- Download only a time range (e.g. 01:20 to 03:45) using yt-dlp sections
- Batch download from a pasted list or text file
- Scheduled downloads (overnight, or on Wi-Fi only)
- Bandwidth limit slider
- Subscribe to a channel and auto-download new uploads
- Cookie import for age-restricted or members-only videos you have access to
- Embed thumbnail, metadata and chapters into the file
- SponsorBlock integration to cut or mark sponsor segments

**Playback**

- Loop a section (A-B repeat)
- Take a screenshot of the current frame
- Mini player and always-on-top mode
- Queue and autoplay next in playlist
- Audio visualizer for audio-only files
- Remote control over the local network from a phone

**Library and organization**

- Auto-organize into folders by channel or playlist
- Storage dashboard (space used per channel, biggest files, clean-up suggestions)
- Export or import the library as JSON
- Notes and timestamped bookmarks on videos
- Local full-text search through subtitles ("find the moment someone says X")

**Media tools (ffmpeg)**

- Convert to another format or compress to a smaller size
- Trim and cut clips from a downloaded video
- Extract audio, extract frames, make GIFs
- Generate seek-bar preview thumbnails

**Quality of life**

- System tray with background downloads
- Desktop notifications when a download finishes
- Light/dark theme
- Drag a link onto the window to start a download
- Auto-update the bundled yt-dlp (important, see Risks)
- Command palette (Ctrl+K)
- Optional TUI mode (ratatui) sharing the same Rust core

---

## Playback notes

The Linux Tauri webview (WebKitGTK) may not play every codec. Best-quality YouTube downloads are often VP9/AV1 in `.mkv` or `.webm`, which can fail or stutter. Options, in order of effort:

1. **Default to H.264 + AAC in `.mp4`.** Plays almost everywhere, at the cost of slightly lower resolution on some videos.
2. **Transcode on demand** with ffmpeg when a file is not playable.
3. **Use mpv** (embedded via `libmpv` or launched as an external window) for best codec support.

Decide after testing real files in the Tauri webview.

## Risks and things to watch

- **yt-dlp breaks regularly** as YouTube changes. Plan for an in-app "update yt-dlp" button or auto-update.
- **ffmpeg and yt-dlp must be available**: bundle them as Tauri sidecars, or check for them at startup and explain how to install.
- **Terms of service and copyright**: YouTube's terms restrict downloading, and copyright applies to most videos. Keep the tool aimed at personal use of content you have the right to save, and don't ship features aimed at redistribution.
- **Large files**: stream progress and never load whole videos into memory.

## Roadmap

1. Scaffold the Tauri app (`npm create tauri-app@latest`)
2. Rust command: fetch video info with yt-dlp (`--dump-json`)
3. Rust command: download with progress events
4. Frontend: URL box, progress bar, library grid
5. Player view with codec testing
6. SQLite library, then queue and settings
7. Pick features from the v0.2 and v0.3 lists

## Getting started

Prerequisites: Rust, Node.js, the Tauri system dependencies, `yt-dlp` and `ffmpeg`.

```bash
npm install
npm run tauri dev
```
