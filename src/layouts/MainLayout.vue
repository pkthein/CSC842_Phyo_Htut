<template>
  <q-layout view="hHh lpR fFf">

    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <router-link to="/">
            <q-avatar>
              <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
            </q-avatar>
            <!-- Title -->
          </router-link>
        </q-toolbar-title>

        <div v-if="$q.cookies.has('eatup_token')" class="q-gutter-sm">
          <q-btn dense flat round icon="add" to="/user/ingredient" />
          <q-btn dense flat round icon="person" to="/user" />
          <q-btn
            no-caps dense outline
            class="bg-white"
            color="black"
            label="Log Out"
            @click="logOut"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    logOut: function () {
      this.$q.cookies.remove('eatup_token')
      this.$router.push('/login').catch(() => false)

      return true
    }
  }
}
</script>
