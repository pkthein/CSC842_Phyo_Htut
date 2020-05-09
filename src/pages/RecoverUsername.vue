<template>
  <div
    class="q-pa-md App"
    style="margin-top: 20%;"
    align="center"
  >
    <q-form @submit="onSubmit" class="q-gutter-lg">
      <q-input
        outlined dense required
        class="bg-grey-3"
        type="email"
        placeholder="Email"
        v-model="login.email"
      />

      <q-btn
        no-caps outline
        type="submit"
        color="primary"
        class="i-btn-2"
        @click="routeTo('/login')"
      >
        <a style="color: black;">Forgot Username</a>
      </q-btn>
    </q-form>
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
    },
    onSubmit: function () {
      return true
    }
  }
}
</script>

<style lang="stylus">

</style>
