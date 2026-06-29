{ pkgs ? import <nixpkgs> { } }:
pkgs.mkShell {
  buildInputs = with pkgs; [
    # Rust toolchain
    cargo
    rustc
    rust-analyzer
    # Tauri system dependencies
    webkitgtk_4_1
    libsoup_3
    cairo
    gdk-pixbuf
    glib
    gtk3
    librsvg
    openssl
    pkg-config
    # Tools
    curl
    wget
    nodejs
  ];

  PKG_CONFIG_PATH = with pkgs;
    "${cairo.dev}/lib/pkgconfig:${glib.dev}/lib/pkgconfig:${gdk-pixbuf.dev}/lib/pkgconfig:${gtk3.dev}/lib/pkgconfig:${librsvg.dev}/lib/pkgconfig:${libsoup_3.dev}/lib/pkgconfig:${webkitgtk_4_1.dev}/lib/pkgconfig";
}
