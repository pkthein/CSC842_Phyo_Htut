<template>
  <div class="q-pa-sm App">
    <q-input outlined v-model="filter" debounce="300">
      <template v-slot:append>
        <q-icon v-if="filter === ''" name="search" />
        <q-icon
          v-else
          name="clear" class="cursor-pointer"
          @click="filter = ''"
        />
      </template>
    </q-input>

    <q-list class="q-my-sm">
      <div v-for="(val, key) in optionsInUse" :key="key.id">
        <q-item class="bg-grey-3" tag="label" v-ripple>
          <q-item-section side>
            <q-checkbox
              v-model="optionsInUse[key].active"
              @input="updateOptions(key)"
            />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-capitalize">
              {{ key }}
              <div class="text-caption">
                {{
                  optionsInUse[key].expires ?
                  `(${Math.round((new Date(optionsInUse[key].expires) - Date.now()) / (1000 * 24 * 3600))} days)` :
                  ''
                }}
              </div>
            </q-item-label>
          </q-item-section>

          <q-item-section align="right">
            <q-item-label>
              <div class="q-gutter-sm">
                <q-btn
                  dense round
                  icon="bar_chart"
                  color="black"
                  @click="statsDialogHelper(key)"
                  :disable="!optionsInUse[key].active"
                />

                <q-btn
                  dense round
                  icon="delete"
                  color="black"
                  @click="removeKey(key)"
                />
              </div>
            </q-item-label>
          </q-item-section>

        </q-item>
        <q-separator spaced />
      </div>
    </q-list>

    <q-page-sticky position="bottom-left" :offset="[18, 18]">
      <q-btn
        outline round
        color="dark" label="Add" class="bg-white"
        @click="addIngredient"
      />
    </q-page-sticky>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        outline round
        color="dark" label="OK" class="bg-white"
        @click="onSubmit"
      />
    </q-page-sticky>

    <q-dialog v-model="statsDialog.active" persistent>
      <q-card v-if="statsDialog.data">
        <q-toolbar>
          <q-toolbar-title>
            <span class="text-weight-bold text-capitalize">
              {{ statsDialog.key }}
            </span>
          </q-toolbar-title>
        </q-toolbar>

        <q-card-section
          class="row"
          style="max-width: 350px; min-width: 250px; width: 80vw; margin-top: -12px;"
        >
          <b>Expires on: </b>
          <q-space></q-space>
          {{ `${statsDialog.data.expires}`.slice(0, 15) }}
        </q-card-section>

        <q-card-actions align="right" class="bg-white">
          <q-btn
            no-caps round dense flat
            icon="file_copy"
            @click="copyToBoard"
          />

          <q-btn
            no-caps dense flat v-close-popup
            label="Close"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  created () {
    for (const key in this.options) {
      if (this.options[key].active) {
        this.options[key].expires = new Date(Date.now() + this.expire)
      }
    }

    if (this.$q.sessionStorage.has('eatup_ingredients')) {
      this.options = this.$q.sessionStorage.getItem('eatup_ingredients')
    }

    this.sortIngredients()

    this.optionsInUse = this.options
  },
  data () {
    return {
      statsDialog: {
        active: false,
        data: null,
        key: null
      },
      expire: 7 * 24 * 3600 * 1000,
      options: {
        egg: {
          active: false,
          expires: ''
        },
        rice: {
          active: false,
          expires: ''
        },
        pork: {
          active: false,
          expires: ''
        },
        beef: {
          active: false,
          expires: ''
        }
      },
      optionsInUse: {},
      filter: ''
    }
  },
  methods: {
    copyToBoard: function () {
      let msg = this.statsDialog.key[0].toUpperCase()
      msg += this.statsDialog.key.slice(1)

      const date = `${this.statsDialog.data.expires}`.slice(0, 10)
      msg = `${msg} expires on ${date}. We have to cook it fast =)`

      this.$q.notify({
        type: 'positive',
        message: 'Copied message to the clipboard!',
        position: 'top',
        timeout: 500
      })

      navigator.clipboard.writeText(msg)
    },
    statsDialogHelper: function (key) {
      this.statsDialog.active = true
      this.statsDialog.data = this.options[key]
      this.statsDialog.key = key
    },
    onSubmit: function () {
      this.$q.sessionStorage.set('eatup_ingredients', this.options)
      this.$router.push('/').catch(() => false)
    },
    sortIngredients: function () {
      this.options = Object.fromEntries(Object.entries(this.options).sort())
      this.optionsInUse = Object.fromEntries(
        Object.entries(this.optionsInUse).sort()
      )
    },
    addIngredient: function () {
      this.$q.dialog({
        title: 'Add Ingredient',
        message: 'Please enter the ingredient.',
        prompt: {
          model: '',
          outlined: true,
          isValid: val => val.length > 1, // << here is the magic
          type: 'text' // optional
        },
        cancel: true,
        persistent: true
      }).onOk(item => {
        item = item.toLowerCase()

        if (!(item in this.options)) {
          this.options[item] = {
            active: true,
            expires: new Date(Date.now() + this.expire)
          }
          this.optionsInUse[item] = {
            active: true,
            expires: new Date(Date.now() + this.expire)
          }

          item = item[0].toUpperCase() + item.slice(1)

          this.$q.notify({
            type: 'positive',
            message: `${item} was added.`,
            timeout: '500'
          })

          this.sortIngredients()
          this.$forceUpdate()
        } else {
          this.$q.notify({
            type: 'negative',
            message: 'Ingredients must be unique!',
            timeout: '500'
          })
        }
      })
    },
    updateOptions: function (key) {
      this.options[key].active = !this.options[key].active
      this.optionsInUse[key].active = !this.optionsInUse[key].active

      if (this.options[key].active) {
        this.options[key].expires = new Date(Date.now() + this.expire)
        this.optionsInUse[key].expires = new Date(Date.now() + this.expire)
      } else {
        this.options[key].expires = ''
        this.optionsInUse[key].expires = ''
      }
    },
    filterFunction: function () {
      if (this.filter === '') {
        this.optionsInUse = this.options
      } else {
        const tmp = {}

        for (const key in this.options) {
          if (key.includes(this.filter.toLowerCase())) {
            tmp[key] = this.options[key]
          }
        }

        this.optionsInUse = tmp
      }
    },
    removeKey: function (key) {
      delete this.options[key]
      delete this.optionsInUse[key]

      this.$forceUpdate()
    }
  },
  watch: {
    filter: 'filterFunction'
  }
}
</script>

<style lang="stylus">

</style>
