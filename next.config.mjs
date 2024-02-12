/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ['raw-loader', 'glslify-loader']
    })

    return config
  }
}

export default nextConfig
