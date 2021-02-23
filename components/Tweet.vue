<template>
  <div
    class="card p-2 mb-2 rounded"
    :class="{ 'card-active': isSelected }"
    @click="selected()"
  >
    <div class="d-flex">
      <div class="pe-2">
        <img
          :src="authorImage.replace('_normal', '_bigger')"
          class="rounded-circle border"
          width="25"
        />
      </div>
      <div class="px-2 small w-100">
        <div class="fw-normal d-flex justify-content-between">
          <span> {{ authorName }}</span>
          <span v-if="isNewTweet" class="badge bg-danger p-1">New</span>
        </div>
        <div class="text-secondary fw-light">
          {{ text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isSelected: {
      type: Boolean,
      default: false,
    },
    isNew: {
      type: Boolean,
      default: true,
    },
    id: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    authorId: {
      type: String,
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    authorImage: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isNewTweet: this.isNew,
    }
  },
  methods: {
    selected() {
      this.isNewTweet = false
      this.$emit('select')
    },
  },
}
</script>

<style scoped>
.card {
  cursor: pointer;
}
.card-active {
  background-color: #f7f6f2;
}
</style>
