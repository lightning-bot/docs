import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { generate } from './scripts/content.mjs'
export default defineConfig({ plugins: [vue(), tailwindcss(), { name: 'docs-content', handleHotUpdate({file,server}) { if (/\.md$/.test(file)) { generate(); server.ws.send({type:'full-reload'}) } } }] })
