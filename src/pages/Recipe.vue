<template>
  <q-page
    class="q-pa-md App"
    align="center"
  >
    <h5 class="" style="margin: 0em 0em .5em 0em;">
      <b>{{ data.title }}</b>
    </h5>

    <div>
      <q-img
        :src="data.img"
        :ratio="4/3"
      />
    </div>

    <div class="q-pa-sm" align="left">
      <b style="font-size: 1.25em;">
        Ingredient(s):
      </b>

      <ul>
        <div v-for="val in data.ingredients" :key="val.id">
          <li class="text-capitalize">
            {{ val }}
          </li>
        </div>
      </ul>

      <b style="font-size: 1.25em;">
        Procedure(s):
      </b>

      <ul>
        <div v-for="val in data.steps" :key="val.id">
          <li>{{val}}</li>
        </div>
      </ul>

      <p>You may now enjoy your meal.</p>
    </div>

    <q-page-sticky position="bottom-left" :offset="[18, 18]">
      <q-btn
        outline round
        color="dark" label="Back" class="bg-white"
        @click="goBack"
      />
    </q-page-sticky>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        outline round
        color="dark" label="Done" class="bg-white"
        to="/user/ingredient"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
export default {
  created () {
    if (this.$q.sessionStorage.has('eatup_recipe')) {
      this.data = this.$q.sessionStorage.getItem('eatup_recipe')
    } else {
      this.$router.push('/').catch(() => false)
    }
  },
  data () {
    return {
      data: null
    }
  },
  methods: {
    goBack: function () {
      this.$router.go(-1)

      return true
    }
  }
}
</script>

<style lang="stylus">

</style>
