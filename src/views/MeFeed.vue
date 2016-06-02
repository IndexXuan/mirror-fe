<template>
  <div class="me-feed-container">
    <blur-banner
      :blur-amount="0"
      :url="'http://gaoxiao.js-edu.cn/UpFile/0052/5283/20120629142742.jpg'"
      :height="150"
    >
    </blur-banner>

    <div v-for="item in assess" class="comment">
      <span class="comment-course">{{ item.course }}</span>
      <span class="fr">
        <star-rater
          :disabled="true"
          :max="5"
          :value.sync="item.rate"
          active-color="#04BE02"
          :font-size="14"
        >
        </star-rater>
      </span>
      <p class="comment-text">{{ item.comment }}</p>
      <span class="comment-class fl">{{ item.classFor }}</span>
      <span class="comment-time fr">{{ item.time }}</span>
    </div>

  </div>
</template>

<style lang="scss">
  @import "../vars";

  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  .me-feed-container {
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .comment {
    padding: 10px;
    position: relative;
    overflow: hidden;
  }
  .comment::after {
    content: "";
    position: absolute;
    width: 100%;
    bottom: 0;
    border-bottom: 1px solid $light-grey;
  }
  .comment-course,
  .comment-class,
  .comment-time {
    font-size: 14px;
    color: #7F7D7D;
  }
  .comment-text {
    line-height: 1.7;
    color: #333;
  }
</style>

<script>
  import 'weui'
  import { getMeFeeds } from '../vuex/getters'
  import BlurBanner from 'vux-components/blur'
  import StarRater from 'vux-components/rater'

  export default {
    vuex: {
      getters: {
        getMeFeeds
      }
    },
    components: {
      BlurBanner,
      StarRater
    },
    created () {
    },
    ready () {
      let height = document.documentElement.clientHeight - 40 - 55
      let view = document.querySelector('.me-view-container')
      view.style.height = height + 'px'
    },
    data () {
      return {
      }
    },
    computed: {
      assess () {
        return this.getMeFeeds
      }
    },
    methods: {
    },
    route: {
      data ({ to }) {
        return {
        }
      }
    }
  }
</script>
