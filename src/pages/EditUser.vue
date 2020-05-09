<template>
  <div
    class="q-pa-md App"
    style="margin-top: 10vh;"
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

      <div>
        <q-btn
          no-caps outline
          type="submit"
          color="primary"
          class="i-btn-1 q-mb-sm"
        >
          <a style="color: black;">Submit</a>
        </q-btn>

        <q-btn
          no-caps flat
          color="black"
          class="i-btn-1"
          label="Cancel"
          to='/user'
        />
      </div>
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
      this.$router.push({ path: '/user' })

      return true
    }
  }
}
</script>

<style lang="stylus">

</style>
