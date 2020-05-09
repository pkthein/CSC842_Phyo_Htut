<template>
  <div
    class="q-pa-md App"
    style="margin-top: 20vh;"
    align="center"
  >
    <q-form @submit="onSubmit" class="q-gutter-lg">
      <q-input
        outlined dense required
        class="bg-grey-3"
        type="text"
        placeholder="Username"
        v-model="login.user"
      />

      <q-input
        dense outlined required
        class="bg-grey-3"
        type="email"
        placeholder="Email"
        v-model="login.email"
      />

      <q-input
        dense outlined required
        class="bg-grey-3"
        type="password"
        placeholder="Password"
        v-model="login.password"
      />

      <q-input
        dense outlined required
        class="bg-grey-3"
        type="password"
        placeholder="Confirm Password"
        v-model="login.confPassword"
      />

      <q-btn
        no-caps outline
        type="submit"
        color="primary"
        class="i-btn-1"
      >
        <a style="color: black;">Sign Up</a>
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
    onSubmit: function () {
      this.$q.cookies.set(
        'eatup_token',
        `${this.login.user}|${this.login.password}`,
        { sameSite: 'Strict' }
      )
      this.$q.localStorage.set('eatup_user', { email: this.login.email })
      this.$router.push('/init').catch(() => { return false })
      return true
    }
  }
}
</script>

<style lang="stylus">

</style>
