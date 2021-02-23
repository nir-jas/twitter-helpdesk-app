<template>
  <div
    class="border-bottom p-2 d-flex justify-content-between align-items-center"
  >
    <div class="d-flex">
      <img
        :src="author_image.replace('_normal', '_bigger')"
        class="rounded-circle border"
        width="25"
      />
      <div class="fw-normal ps-3">{{ author_name }}</div>
    </div>

    <button class="btn btn-light btn-sm rounded-pill px-3">Create Task</button>
  </div>
</template>

<script>
export default {
  props: {
    author_name: {
      type: String,
      required: true,
    },
    author_image: {
      type: String,
    },
  },
}
</script>

<style></style>
