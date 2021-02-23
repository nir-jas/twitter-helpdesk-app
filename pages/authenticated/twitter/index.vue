<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div class="text-center">
      <fa :icon="['fas', 'life-ring']" size="3x" class="text-danger spin" />
      <div class="p-3 text-secondary">Logging in...</div>
    </div>
  </div>
</template>

<script>
export default {
  auth: 'guest',
  layout: 'guest',
  beforeMount() {
    this.getAccessToken()
  },
  methods: {
    getAccessToken() {
      this.$axios
        .get('/twitter/access_token', {
          params: this.$route.query,
        })
        .then(async (response) => {
          const token = response.data.data.token
          const refreshToken = response.data.data.refreshToken
          await this.$auth.setUser(response.data.data.user)
          await this.$auth.setUserToken(token, refreshToken)
          this.$router.push({ path: '/' })
        })
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.log(e)
        })
    },
  },
}
</script>

<style scoped>
@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}

.spin {
  animation: spinner 1.5s linear infinite;
}
</style>
