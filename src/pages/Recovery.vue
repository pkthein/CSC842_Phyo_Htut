<template>
  <div
    class="q-pa-md App"
    style="margin-top: 20%;"
    align="center"
  >
    <div class="q-gutter-lg">
      <q-btn
        no-caps outline
        color="primary"
        class="i-btn-2"
        @click="routeTo('/forgot/username')"
      >
        <a style="color: black;">Forgot Username</a>
      </q-btn>

      <q-btn
        no-caps outline
        color="primary"
        class="i-btn-2"
        @click="routeTo('/forgot/password')"
      >
        <a style="color: black;">Forgot Password</a>
      </q-btn>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      login: {}
    }
  },
  methods: {
    routeTo: function (path) {
      return this.$router.push(path).catch(() => false)
    }
  }
}
</script>

<style lang="stylus">

</style>
