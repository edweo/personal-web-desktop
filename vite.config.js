export default {
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    target: 'esnext'
  },
  server: {
    host: true,
    port: 4444
  },
  preview: {
    host: true,
    port: 4444
  }
}
