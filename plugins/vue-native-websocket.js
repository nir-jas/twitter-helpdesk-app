import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'

export default ({ store }, inject) => {
  Vue.use(VueNativeSock, process.env.WS_URL, {
    store,
    connectManually: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 3000,
    format: 'json',
  })
}
