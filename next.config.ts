import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/opensearch.xml",
        headers: [
          {
            key: "Content-Type",
            value: "application/opensearchdescription+xml",
          },
        ],
      },
    ]
  },
}

export default nextConfig

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare"
initOpenNextCloudflareForDev()
