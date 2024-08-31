const NodeMediaServer = require("node-media-server");

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: 8000,
    mediaroot: "./media",
    allow_origin: "*",
  },
  trans: {
    ffmpeg:
      "C://ffmpeg//ffmpeg-2024-08-21-git-9d15fe77e3-full_build//bin//ffmpeg.exe",
    tasks: [
      {
        app: "live",
        vc: "libx264",
        ac: "aac",
        hls: true,
        hlsFlags: "[hls_time=4:hls_list_size=5:hls_flags=delete_segments]",
      },
    ],
  },
};

const nms = new NodeMediaServer(config);

nms.run();
