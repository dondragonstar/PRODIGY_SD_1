# PRODIGY_SD_1 - Temperature Converter

A desktop temperature conversion app built with **Rust** and **Tauri**.

Converts between **Celsius**, **Fahrenheit**, and **Kelvin**.

## Build & Run

```bash
nix-shell shell.nix --run 'cargo tauri dev'
```

Or for a release build:

```bash
cd src-tauri && nix-shell ../shell.nix --run 'cargo build --release'
```
