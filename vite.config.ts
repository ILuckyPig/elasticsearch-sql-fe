import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'


// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4001
  },
  plugins: [
    vue(),
    viteMockServe({
      mockPath: './mock/', // 设置模拟数据的存储文件夹
      supportTs: true, // 是否读取ts文件模块
      logger: true, //  是否在控制台显示请求日志
      localEnabled: true, //设置是否启用本地mock文件
      prodEnabled: true, //设置打包是否启用 mock 功能
      injectCode: `
          import { setupProdMockServer } from './mock/mockProdServer';
          setupProdMockServer();
        `,
    })
  ]
})
