<template>
  <div class="reply-window position-sticky top-100 start-50">
    <div class="d-flex p-2 g-2 align-items-center">
      <div class="pe-2 d-none d-lg-block">
        <img
          :src="authorImage.replace('_normal', '_bigger')"
          class="rounded-circle border"
          width="30"
        />
      </div>
      <form class="w-100" @submit.prevent="postTweet">
        <div class="input-group input-group-sm">
          <input
            v-model="status"
            type="text"
            class="form-control form-control-sm border-end-0 reply-input"
            placeholder="Reply . . ."
            required
          />
          <div class="input-group-text bg-white border-start-0 reply-send">
            <button
              class="btn btn-secondary btn-sm text-white rounded-circle"
              type="submit"
              :disabled="isPosting"
            >
              <div
                v-if="isPosting"
                class="spinner-border text-light spinner-border-sm"
                role="status"
              ></div>

              <fa v-else :icon="['fas', 'paper-plane']" />
            </button>
          </div>
        </div>
      </form>
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
    authorImage: {
      type: String,
      required: true,
    },
    replyToUsername: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      status: '',
      isPosting: false,
    }
  },
  methods: {
    postTweet() {
      this.isPosting = true
      this.$axios
        .post('/tweets', {
          status: `@${this.replyToUsername} ${this.status}`,
          tweet_id: this.tweetId,
        })
        .then((response) => {
          this.isPosting = false
          this.status = ''
          this.$emit('newreply', response.data.data)
        })
        .catch((e) => {
          this.isPosting = false
          this.status = ''
          // eslint-disable-next-line no-console
          console.log(e)
        })
    },
  },
}
</script>

<style scoped>
.reply-input {
  border-top-left-radius: 50rem;
  border-bottom-left-radius: 50rem;
}

.reply-send {
  border-top-right-radius: 50rem;
  border-bottom-right-radius: 50rem;
}
.form-control {
  box-shadow: none !important;
  border: 1px solid #ced4da !important;
}
</style>
