<template>
  <div
    class="q-pa-md App"
    style="margin-top: 10vh;"
    align="center"
  >
    <q-page>
      <div>
        <q-avatar
          class="cursor-pointer"
          size="150px" font-size="52px"
          color="teal" text-color="white"
          @click="fileInvoker"
        >
          <q-icon v-if="!data.img" name="person"></q-icon>
          <img v-else :src="data.img" />
        </q-avatar>
      </div>

      <input hidden ref="fileInvoke" type='file' @change="onChange" />

      <div class="q-mt-sm q-pa-md" align="left">
        <p>
          <b>Name:</b> <span> {{ data.name }}</span>
          <q-popup-edit v-model="data.name" :validate="val => val.length > 5">
            <template
              v-slot="{ initialValue, value, emitValue, validate, set, cancel }"
            >
              <q-input
                autofocus dense outlined
                :value="data.name"
                :rules="[
                  val => validate(value) || 'More than 5 chars required'
                ]"
                hide-bottom-space
                @input="emitValue"
              >
                <template v-slot:after>
                  <div class="flex flex-center">
                    <q-btn
                      flat dense
                      color="negative" icon="cancel"
                      @click.stop="cancel"
                    />

                    <q-btn
                      flat dense
                      color="positive" icon="check_circle"
                      @click.stop="set"
                      :disable="
                        validate(value) === false || initialValue === value
                      "
                    />
                  </div>
                </template>
              </q-input>
            </template>
          </q-popup-edit>
        </p>

        <p>
          <b>Email:</b> <span> {{ data.email }}</span>
          <q-popup-edit v-model="data.email" :validate="val => val.length > 5">
            <template
              v-slot="{ initialValue, value, emitValue, validate, set, cancel }"
            >
              <q-input
                autofocus dense outlined
                :value="data.email"
                :rules="[
                  val => validate(value) || 'More than 5 chars required'
                ]"
                hide-bottom-space
                @input="emitValue"
              >
                <template v-slot:after>
                  <div class="flex flex-center">
                    <q-btn
                      flat dense
                      color="negative" icon="cancel"
                      @click.stop="cancel"
                    />

                    <q-btn
                      flat dense
                      color="positive" icon="check_circle"
                      @click.stop="set"
                      :disable="
                        validate(value) === false || initialValue === value
                      "
                    />
                  </div>
                </template>
              </q-input>
            </template>
          </q-popup-edit>
        </p>
      </div>

      <div class="q-gutter-md">
        <q-btn
          no-caps outline
          color="primary"
          class="i-btn-1"
          @click="onSubmit"
        >
          <a style="color: black;">Done</a>
        </q-btn>

        <q-btn
          no-caps outline
          color="primary"
          class="i-btn-1"
          to="/user/edit"
        >
          <a style="color: black;">Account Edit</a>
        </q-btn>
      </div>
    </q-page>
  </div>
</template>

<script>
export default {
  created () {
    if (this.$q.localStorage.has('eatup_user')) {
      this.data = this.$q.localStorage.getItem('eatup_user')
    }
  },
  data () {
    return {
      data: {
        name: 'John Doe',
        email: 'jdoe@gmail.com',
        img: ''
      }
    }
  },
  methods: {
    fileInvoker: function () {
      this.$refs.fileInvoke.click()
    },
    onChange: function () {
      const file = this.$refs.fileInvoke.files[0]

      if (this.data.img !== '') {
        URL.revokeObjectURL(this.data.img)
      }

      this.data.img = URL.createObjectURL(file)
    },
    onSubmit: function () {
      this.$q.localStorage.set('eatup_user', this.data)

      this.$router.push('/').catch(() => false)
    }
  }
}
</script>

<style lang="stylus">

</style>
