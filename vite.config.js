import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { generate, root } from './scripts/content.mjs'

export default defineConfig({ plugins: [vue(), tailwindcss(), {
  name: 'docs-content',
  handleHotUpdate({file, server}) {
    if (!file.endsWith('.md') && file !== path.join(root, 'navigation.toml')) return
    try {
      generate()
      const content = server.moduleGraph.getModuleById(path.join(root, 'src/generated/content.json'))
      if (content) server.moduleGraph.invalidateModule(content)
      server.ws.send({type: 'full-reload'})
    } catch (error) {
      server.config.logger.error(error.message)
      server.ws.send({type: 'error', err: {message: error.message, stack: error.stack, plugin: 'docs-content'}})
    }
    return []
  },
}] })
