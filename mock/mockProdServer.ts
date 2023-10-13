import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

import testModule from '../mock/test'

export function setUpProdMockServer() {
    createProdMockServer(testModule)
}