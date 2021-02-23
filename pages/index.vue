<template>
  <div class="container p-2 conversations">
    <div class="row mb-4">
      <div class="col-12 col-lg-3">
        <h4 class="m-0 p-0 strong">Conversations</h4>
      </div>
      <div class="col-6 col-lg-2 p-0">
        <div class="input-group">
          <span class="input-group-text search-icon rounded-pill"
            ><fa :icon="['fas', 'search']" class="text-secondary"
          /></span>
          <input
            type="text"
            class="form-control form-control-sm rounded-pill search-input"
            placeholder="Quick Search"
          />
        </div>
      </div>
      <div class="col-6 col-lg-7 text-end pe-0">
        <button class="btn btn-light btn-sm rounded-pill px-3">
          <fa :icon="['fas', 'filter']" /> Filter
        </button>
      </div>
    </div>

    <div class="conversation-tweets">
      <div class="row">
        <div class="col-12 col-lg-3 conversation-tweet-cards">
          <Tweet
            v-for="item in tweets"
            :id="item.id_str"
            :key="item.id_str"
            :text="item.text"
            :author-id="item.user.id_str"
            :author-name="item.user.name"
            :author-image="item.user.profile_image_url_https"
            :is-selected="activeTweetId == item.id_str"
            :is-new="item.is_new ? true : false"
            @select="showTweetReplies(item)"
          />
        </div>
        <div class="col d-none d-lg-block conversation-tweets">
          <div v-if="activeTweetId" class="row g-0 h-100">
            <div class="col-8 border">
              <ChatHeader
                :author_name="tweet.user.name"
                :author_image="tweet.user.profile_image_url_https"
              />
              <ChatWindow
                :tweet-id="activeTweetId"
                :scroll-to-end="scrollChat"
                :new-reply="replyEvent"
              />
              <ReplyWindow
                :tweet-id="activeTweetId"
                :author-image="$auth.user.profile_image_url"
                :reply-to-username="tweet.user.screen_name"
                @newreply="scrollChat = true"
              />
            </div>
            <AuthorProfile
              class="col"
              :name="tweet.user.name"
              :image="tweet.user.profile_image_url_https"
              :description="tweet.user.description"
              :username="tweet.user.screen_name"
              @close="closeTweet"
            />
          </div>
          <div v-else class="row h-100">
            <div
              class="col d-flex bg-white justify-content-center align-items-center card"
            >
              <div class="text-center">
                <fa
                  :icon="['fas', 'life-ring']"
                  size="3x"
                  class="text-secondary m-3"
                />
                <h6 class="lead">Select a tweet to see replies</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Ws from '@adonisjs/websocket-client'

const ws = Ws(process.env.WS_URL, {
  path: 'ws',
})
export default {
  data() {
    return {
      tweets: [],
      tweet: null,
      replies: [],
      activeTweetId: null,
      scrollChat: false,
      isWsConnected: false,
      tweetChannel: null,
      replyChannel: null,
      replyEvent: null,
    }
  },
  mounted() {
    this.getTweets()
    ws.withJwtToken(
      this.$auth.strategy.token.get().replace('Bearer ', '')
    ).connect()
    ws.on('open', () => {
      this.isWsConnected = true
      this.tweetChannel = ws.subscribe(`twitter:${this.$auth.user.screen_name}`)
      this.tweetChannel.on('new:tweet', (data) => {
        const tweet = data
        tweet.is_new = true
        this.tweets.unshift(tweet)
      })
    })
    ws.on('close', () => {
      this.isWsConnected = false
    })
  },
  methods: {
    getTweets() {
      this.$axios
        .get('/tweets/mentioned')
        .then((response) => {
          this.tweets = response.data.data
        })
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.log(e)
        })
    },
    showTweetReplies(tweet) {
      if (this.isWsConnected) {
        if (!ws.getSubscription(`twitter:${tweet.id_str}`)) {
          this.replyChannel = ws.subscribe(`twitter:${tweet.id_str}`)
          this.replyChannel.on('new:tweet:reply', (data) => {
            if (data.conversation_id === this.activeTweetId) {
              this.replyEvent = data
            }
          })
        }
      }

      this.tweet = tweet
      this.activeTweetId = tweet.id_str
    },
    closeTweet() {
      this.tweet = null
      this.activeTweetId = null
    },
  },
}
</script>

<style scoped>
.conversations {
  height: calc(100vh - 88px);
  max-height: calc(100vh - 88px);
}

.conversations-tweets {
  height: calc(100vh - 129px);
  max-height: calc(100vh - 129px);
}

.conversation-tweet-cards {
  height: calc(100vh - 129px);
  max-height: calc(100vh - 129px);
  overflow-y: scroll;
}

.search-input {
  border-left: none;
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
}

.search-icon {
  background-color: transparent;
  border-right: none;
  border-top-right-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
}
</style>
