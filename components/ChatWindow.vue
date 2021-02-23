<template>
  <div id="chat-window" class="chat-window p-2">
    <template v-if="!isLoading">
      <div v-for="item in replies" :key="item.id_str" class="mb-3 small">
        <div class="d-flex">
          <img
            :src="item.user.profile_image_url"
            class="rounded-circle border me-2"
            width="20"
          />
          <span class="fw-bold"> {{ item.user.name }} </span>
        </div>
        <div class="p-2 ps-4">
          {{ item.text }}
        </div>
        <div v-if="item.media" class="p-2 ps-4">
          <img
            v-for="m in item.media"
            :key="m.media_key"
            :src="m.url"
            width="100"
            class="px-2"
          />
        </div>
      </div>
    </template>
    <div v-else class="d-flex h-100 justify-content-center align-items-center">
      <fa :icon="['fas', 'life-ring']" size="3x" class="text-secondary spin" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tweetId: {
      type: String,
      required: true,
    },
    newReply: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      replies: [],
      isLoading: true,
      scrollToEnd: false,
    }
  },
  watch: {
    tweetId(newId, oldId) {
      this.isLoading = true
      this.showTweetReplies()
    },
    scrollToEnd(newId, oldId) {
      this.scrollWindow()
    },
    newReply(newObj, oldObj) {
      this.replies.push(newObj)
      this.$nextTick(() => {
        setTimeout(() => {
          this.scrollWindow()
        }, 100)
      })
    },
  },
  mounted() {
    this.showTweetReplies()
  },
  methods: {
    showTweetReplies() {
      this.$axios
        .get(`/tweets/${this.tweetId}/replies`)
        .then((response) => {
          this.replies = response.data.data
          this.isLoading = false
          setTimeout(() => {
            this.scrollWindow()
          }, 100)
        })
        .catch((e) => {
          this.isLoading = false
          // eslint-disable-next-line no-console
          console.log(e)
        })
    },
    scrollWindow() {
      const div = document.getElementById('chat-window')
      div.scrollTop = div.scrollHeight
    },
  },
}
</script>

<style scoped>
.chat-window {
  height: calc(100vh - 238px);
  max-height: calc(100vh - 238px);
  overflow-y: scroll;
}
@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}

.spin {
  animation: spinner 1.5s linear infinite;
}
</style>
