<template>
  <div>
    <div class="font-weight-medium pb-1" v-text="title">Your seed phrase</div>
    <v-card outlined class="v-markup" color="grey darken-4" dark>
      <div class="content-markup" v-text="content"></div>

      <div class="v-markup__copy">
        <v-icon title="Copy" aria-label="Copy" @click="copyMarkup">
          mdi-content-copy
        </v-icon>

        <v-slide-x-transition>
          <span v-if="copied" class="v-markup__copied">Copied</span>
        </v-slide-x-transition>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      copied: false
    };
  },
  methods: {
    copyMarkup() {
      const markup = this.$el.querySelector("div.content-markup");
      markup.setAttribute("contenteditable", "true");
      markup.focus();
      document.execCommand("selectAll", false, null);
      this.copied = document.execCommand("copy");
      markup.removeAttribute("contenteditable");
      if (window.getSelection) {
        if (window.getSelection().empty) {
          // Chrome
          window.getSelection().empty();
        } else if (window.getSelection().removeAllRanges) {
          // Firefox
          window.getSelection().removeAllRanges();
        }
      } else if (document.selection) {
        // IE?
        document.selection.empty();
      }
      setTimeout(() => {
        this.copied = false;
      }, 1000);
    }
  }
};
</script>

<style lang="sass">
.v-application .v-markup
  align-items: center
  box-shadow: none
  display: flex
  border-radius: 4px
  position: relative
  overflow: hidden
  margin-bottom: 16px
  background: #2d2d2d
  color: #fff
  &.theme--dark
    background: #1F1F1F
  pre, code
    margin: 0
    background: transparent
    font-family: 'Inconsolata', monospace
    font-weight: 300
    font-size: 15px
    line-height: 1.55
  code
    position: relative
    box-shadow: none
    overflow-x: auto
    overflow-y: hidden
    word-break: break-word
    flex-wrap: wrap
    align-items: center
    vertical-align: middle
    white-space: pre-wrap
    &:before
      display: none
  &__copied
    position: absolute
    top: 12px
    right: 75px
  &__copy
    position: absolute
    top: 0
    cursor: pointer
    width: 25px
    height: 25px
    z-index: 1
  &__copy
    right: 0
  &:after
    position: absolute
    right: 10px
    transition: opacity .2s ease-in
    content: attr(data-lang)
    color: rgba(#000, 0.3)
    font-size: 1rem
    font-weight: 700
    top: 5px
  &:hover
    .v-markup__copy
      .v-icon
        opacity: 1
      &:after
        opacity: 0
  .v-markup__copy
    .v-icon
      color: inherit
      position: absolute
      right: 0
      transition: opacity .2s ease-in
      font-size: 1.5rem
      opacity: 0
      top: 0
      width: 50px
      height: 50px
      z-index: 4
  div[class*="content-"]
    color: #f8c555
    font-weight: bold
    background: none
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace
    font-size: 1rem
    text-align: left
    line-height: 1.5
    word-spacing: normal
    word-break: normal
    word-wrap: break-word
    tab-size: 4
    hyphens: none
  div[class*="content-"]
    padding: 1rem
    margin: 0
    overflow: auto
</style>
