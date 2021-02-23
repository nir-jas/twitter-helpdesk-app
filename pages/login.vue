<template>
  <div class="container-fluid py-2 py-lg-5 bg-light min-vh-100">
    <div class="row">
      <div class="col-12 col-lg-4 offset-lg-4">
        <div class="card py-2 py-lg-3">
          <div class="card-header bg-white border-0 text-center py-3">
            <fa :icon="['fas', 'life-ring']" size="3x" class="text-danger" />
            <h4 class="lead mt-2">RPT HelpDesk</h4>
          </div>
          <div v-if="!isAgent" class="card-body text-center">
            <div class="d-grid">
              <button
                class="btn bg-twitter"
                :disabled="isLoggingIn"
                @click="getRequestToken()"
              >
                <span
                  v-if="isLoggingIn"
                  class="spinner-border text-light spinner-border-sm"
                  role="status"
                ></span>
                <span v-else>
                  <fa :icon="['fab', 'twitter']" class="me-2" /> Login with
                  Twitter
                </span>
              </button>
            </div>
          </div>
          <div v-else class="card-body">
            <form @submit.prevent="agentLogin">
              <div class="mb-3">
                <input
                  id="email"
                  class="form-control"
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  required
                />
              </div>
              <div class="mb-3">
                <input
                  id="password"
                  class="form-control"
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  required
                />
              </div>
              <div class="mb-3 d-grid">
                <button type="submit" class="btn btn-secondary">Login</button>
              </div>
            </form>
          </div>
          <div
            class="card-footer text-center small bg-white text-secondary border-0"
          >
            <template v-if="!isAgent">
              Are you an agent?
              <span class="text-danger login-here" @click="isAgent = true"
                >Login here</span
              >
            </template>
            <template v-else>
              Are you a client?
              <span class="text-danger login-here" @click="isAgent = false"
                >Login here</span
              >
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  auth: 'guest',
  layout: 'guest',
  data() {
    return {
      isAgent: false,
      isLoggingIn: false,
    }
  },
  methods: {
    getRequestToken() {
      this.isLoggingIn = true
      this.$axios
        .get('/twitter/request_token')
        .then((response) => {
          this.isLoggingIn = false
          window.open(
            `https://api.twitter.com/oauth/authenticate?${response.data.data}`,
            '_self'
          )
        })
        .catch((e) => {
          this.isLoggingIn = false
          // eslint-disable-next-line no-console
          console.log(e)
        })
    },
    agentLogin() {},
  },
}
</script>

<style scoped>
.bg-twitter {
  background-color: #00acee !important;
  color: #ffffff;
}

.login-here {
  cursor: pointer;
}
</style>
