<template>
  <div
    class="sidebar py-3 bg-light h-100 d-block d-flex flex-column justify-content-between"
  >
    <div>
      <div class="bar-brand mb-3">
        <fa :icon="['fas', 'life-ring']" size="2x" class="text-danger" />
      </div>

      <nuxt-link class="bar-item px-2 py-3" to="/" exact
        ><fa :icon="['fas', 'comments']"
      /></nuxt-link>

      <nuxt-link class="bar-item px-2 py-3" to="/team" exact
        ><fa :icon="['fas', 'user-friends']"
      /></nuxt-link>
    </div>

    <div class="text-center">
      <span class="bar-item px-2 py-3" @click="logout()"
        ><fa :icon="['fas', 'sign-out-alt']"
      /></span>

      <div class="py-3">
        <img
          :src="$auth.user.profile_image_url"
          class="rounded-circle w-50 border border-success"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$router.push({ path: '/login' })
    },
  },
}
</script>

<style scoped>
a.nuxt-link-active {
  color: #2e2e2d;
  background-color: #e8e7e3;
}

.sidebar {
  width: 60px;
  display: block;
  z-index: 1;
  overflow: auto;
}

.bar-item,
.bar-brand {
  width: 100%;
  display: block;
  text-align: center;
  border: none;
  white-space: normal;
  float: none;
  outline: 0;
}

.bar-item {
  color: #c0bfbd;
}

.bar-item:hover {
  color: #2e2e2d;
  background-color: #e8e7e3;
  cursor: pointer;
}
</style>
