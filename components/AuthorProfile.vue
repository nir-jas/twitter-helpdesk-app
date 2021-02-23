<template>
  <div class="border p-2">
    <div class="text-end">
      <button
        class="btn btn-light btn-sm rounded-circle text-secondary"
        @click="$emit('close')"
      >
        <fa :icon="['fas', 'times']" />
      </button>
    </div>
    <div class="p-2 text-center">
      <img
        :src="image.replace('_normal', '')"
        class="rounded-circle border"
        width="75"
      />
    </div>
    <div class="fw-normal text-center">{{ name }}</div>
    <div class="text-center small text-primary py-2">
      <a
        class="text-decoration-none"
        :href="`https://twitter.com/${username}`"
        target="_new"
        >@{{ username }}</a
      >
    </div>
    <div class="text-center">
      <button class="btn btn-light btn-sm rounded-pill px-3 me-2">
        <fa :icon="['fas', 'phone-alt']" class="me-2" />Call</button
      ><button class="btn btn-light btn-sm rounded-pill px-3 ms-2">
        <fa :icon="['fas', 'envelope']" class="me-2" />
        Email
      </button>
    </div>
    <div class="p-2">
      <p class="description small">
        {{ description.trim() }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    username: {
      type: String,
    },
    url: {
      type: String,
    },
  },
}
</script>

<style scoped>
.description {
  white-space: pre-wrap;
}
</style>
