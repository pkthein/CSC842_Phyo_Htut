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
        type="password"
        placeholder="Password"
        v-model="login.password"
      />

      <q-btn
        no-caps outline
        type="submit"
        color="primary"
        class="i-btn-1"
      >
        <a style="color: black;">Log In</a>
      </q-btn>
    </q-form>

    <div class="q-mt-md" align="right">
      <router-link to="/signup">Create account</router-link>
      <br/>
      <router-link to="/forgot">Forgot account/password</router-link>
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
    onSubmit: function () {
      this.$q.cookies.set(
        'eatup_token',
        `${this.login.user}|${this.login.password}`,
        { sameSite: 'Strict' }
      )
      this.$router.push('/').catch(() => { return false })
      return true
    }
  }
}
</script>

<style lang="stylus">

</style>
