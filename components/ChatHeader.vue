<template>
  <div
    class="border-bottom p-2 d-flex justify-content-between align-items-center"
  >
    <div class="d-flex">
      <img
        :src="authorImage.replace('_normal', '_bigger')"
        class="rounded-circle border"
        width="25"
      />
      <div class="fw-normal ps-3">{{ authorName }}</div>
    </div>
    <button
      class="btn btn-light btn-sm rounded-circle text-secondary d-block d-lg-none"
      @click="$emit('close')"
    >
      <fa :icon="['fas', 'times']" />
    </button>
    <button class="btn btn-light btn-sm rounded-pill px-3 d-none d-lg-block">
      Create Task
    </button>
  </div>
</template>

<script>
export default {
  props: {
    authorName: {
      type: String,
      required: true,
    },
    authorImage: {
      type: String,
      required: true,
    },
  },
}
</script>

<style></style>
