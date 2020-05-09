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
        placeholder="First Name"
        v-model="login.user"
      />

      <q-input
        dense outlined required
        class="bg-grey-3"
        type="text"
        placeholder="Last Name"
        v-model="login.password"
      />

      <q-btn
        no-caps outline
        type="submit"
        color="primary"
        class="i-btn-1"
      >
        <a style="color: black;">Next</a>
      </q-btn>
    </q-form>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        outline round
        color="dark" label="Skip" class="bg-white"
        to="/user/ingredient"
      />
    </q-page-sticky>
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
      const data = this.$q.localStorage.getItem('eatup_user')
      data.name = `${this.login.user} ${this.login.password}`
      data.img = ''

      this.$q.localStorage.set('eatup_user', data)
      this.$router.push('/user/ingredient').catch(() => { return false })
      return true
    }
  }
}
</script>

<style lang="stylus">

</style>
