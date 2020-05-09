<template>
  <div class="App" style="margin-top: 3vh;">
    <div class="q-mb-md">
      <div class="text-h6">
        Suggested
      </div>

      <q-virtual-scroll
        v-if="curData.length > 0"
        :items="curData"
        virtual-scroll-horizontal
      >
        <template v-slot="{ item, index }">
          <q-card
            v-if="item"
            :key="index"
            class="q-ma-sm q-pa-md cursor-pointer"
            style="width: 300px;"
            @click="routeToRecipe('page', item)"
          >
            <img :src="item.img" style="max-height: 150px; max-width: 300px">
            <div class="text-blue-7" align="left">
              <b class="text-h6 text-underline">{{ item.title }}</b>
            </div>
          </q-card>
        </template>
      </q-virtual-scroll>

      <div v-else class="row q-mx-md q-mt-sm text-italic flex flex-center">
        No ingredients found...
        <q-space></q-space>
        <q-btn dense round color="black" icon="add" to="/user/ingredient" />
      </div>
    </div>

    <q-separator color="primary" />

    <div class="q-mt-sm">
      <div class="row">
        <div class="text-h6 flex flex-center">
          Menu
        </div>
        <q-space></q-space>
        <q-input dense outlined v-model="filter" debounce="300">
          <template v-slot:append>
            <q-icon v-if="filter === ''" name="search" />
            <q-icon
              v-else
              name="clear" class="cursor-pointer"
              @click="filter = ''"
            />
          </template>
        </q-input>
      </div>

      <q-table
        flat hide-header wrap-cells
        separator="none"
        row-key="title"
        :data="data"
        :columns="columns"
        :filter="filter"
        :pagination.sync="pagination"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td colspan="100%" key="title" :props="props">
              <div class="q-pa-md i-card" style="min-height: 15vh;">
                <div
                  class="cursor-pointer"
                  @click="routeToRecipe('page', props.row)"
                >
                  <div class="" align="center">
                    <q-img
                      :src="props.row.img"
                      spinner-color="primary"
                      style="max-height: 150px; max-width: 300px"
                    />
                  </div>

                  <div class="q-my-xs">
                    <q-separator />
                  </div>

                  <div class="text-blue-7" align="left">
                    <b class="text-h6 text-underline">{{ props.row.title }}</b>
                  </div>
                </div>
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    this.fetchData()
  },
  data () {
    return {
      filter: '',
      columns: [
        {
          name: 'title',
          label: 'Title',
          required: true,
          align: 'left',
          field: row => row.title,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'category',
          label: 'Category',
          required: true,
          align: 'left',
          field: row => row.category,
          format: val => `${val}`,
          sortable: true
        }
      ],
      data: [
        {
          title: 'Fried Egg',
          img: 'statics/fried_egg.jpg',
          category: 'Breakfast',
          main: ['egg'],
          ingredients: ['egg'],
          steps: [
            'Put oil into a frying pan.',
            'Crack the egg(s) into the pan.',
            'Let the egg fried to your liking.',
            'Sprinkle salt over the fried egg.'
          ]
        },
        {
          title: 'Boiled Egg',
          img: 'statics/boiled_egg.jpg',
          category: 'Breakfast',
          main: ['egg'],
          ingredients: ['egg'],
          steps: [
            'Put enough water to submege the egg(s) inside a pot.',
            'Boil the water.',
            'Submerge the eggs inside boiling water.',
            'Dependig on your liking, put a timer as show on the image.',
            'Once the timer goes off, please pour the egg(s) out into ice water.',
            'Pouring the eggs into ice water makes peel the egg shells much more effortless.'
          ]
        },
        {
          title: 'Steamed Rice',
          img: 'statics/steamed_rice.jpg',
          category: 'Breakfast',
          main: ['rice'],
          ingredients: ['rice'],
          steps: [
            'Wash the rice.',
            'Rinse until white clouds are no longer forming.',
            'Put the washed rice into the rice cooker.',
            'Add 1 to 1 water to rice.',
            'Turn the rice cooker and let it performs its magic.'
          ]
        },
        {
          title: 'Pork Chop',
          img: 'statics/pork_chop.jpg',
          category: 'Dinner',
          main: ['pork chop'],
          ingredients: [
            'pork chop', 'butter', 'thymes', 'garlic', 'salt', 'black-pepper'
          ],
          steps: [
            'First things first, make garlic brown butter — patience, grasshopper, this will take a little bit of time.',
            'Once your butter is browned, add pork chops to the skillet. (Start with room-temperature chops to prevent toughness.)',
            'Once the pork chops are cooked through, set them aside and focus on the sauce. Turn the heat to low and add mushrooms, oregano, and thyme to the butter.',
            'Whisk in flour and stir out the lumps, then add milk and cook until thickened. ',
            'Add the pork chops back in to heat through and voilà. (I’m serving these over mashed potatoes because the sauce reminds me of gravy — do with that information what you will!)',
            'Special Thanks to: https://www.thekitchn.com/browned-butter-pork-chops-with-mushrooms-recipe-i-am-homesteader-263114'
          ]
        },
        {
          title: 'Fried Chicken',
          img: 'statics/fried_chicken.jpg',
          category: 'Lunch or Dinner',
          main: ['chicken'],
          ingredients: [
            'chicken', 'batter', 'breadcrumbs', 'salt', 'black-pepper'
          ],
          steps: [
            ' Reduce the mustard to 1 tablespoon. I really did enjoy the mustard flavor in this recipe, but it turned off my young kids. Reducing it from 1 1/2 tablespoons to 1 would still provide tang without overpowering the chicken.',
            'Skip the cornmeal in the coating. The cornmeal added little in terms of flavor or texture, and ended up giving the crispy coating a toothsome bite (not in a good way).',
            'Combine oil and duck fat for flavorful but affordable chicken. Duck fat adds delicious flavor to the fried chicken, but combining it with oil will make for more favorable frying conditions (i.e. more responsive to heat adjustments) and make it more affordable, too. I recommend buying an 11.25 ounce jar of duck fat, and adding your favorite fry oil to the skillet, too.',
            'Special thanks to: https://www.thekitchn.com/david-lebovitz-fried-chicken-23003825'
          ]
        },
        {
          title: 'Pan Seared Steak',
          img: 'statics/pan_seared_steak.jpg',
          category: 'Lunch or Dinner',
          main: ['beef'],
          ingredients: [
            'beef', 'butter', 'thymes', 'garlic', 'salt', 'black-pepper'
          ],
          steps: [
            'Take the chill off the steaks. About an hour before grilling, remove the steaks from the fridge.',
            'Get the grill nice and hot. High heat gives the steaks their characteristic grill marks and tender-crisp exterior. Let the grill preheat for at least 20 minutes before grilling the steaks.',
            'Sear the steaks. Place the steaks directly over the hottest area of the grill. Place them on the grill for at least 3 minutes before flipping. Sear for another 3 minutes.',
            'Check the steak’s temperature. You’re looking for: 1) 125°F for rare, 2) 130 to 135°F for medium-rare, and 3) 140°F for medium.',
            'Special thanks to: https://www.thekitchn.com/grilled-steak-22904700'
          ]
        }
      ],
      curData: [],
      pagination: {
        rowsPerPage: 5,
        sortBy: 'title',
        descending: false
      }
    }
  },
  methods: {
    routeToRecipe: function (entry, data) {
      this.$q.sessionStorage.set('eatup_recipe', data)
      this.$router.push(`/recipe/${entry}`)
    },
    fetchData: function () {
      if (this.$q.sessionStorage.has('eatup_ingredients')) {
        const ingredients = this.$q.sessionStorage.getItem('eatup_ingredients')
        const tmp = []

        for (const key in ingredients) {
          if (ingredients[key].active) {
            this.data.forEach(obj => {
              if (obj.main.includes(key)) tmp.push(obj)
            })
          }
        }

        this.curData = tmp
      } else {
        this.curData = []
      }
    },
    goToPost: function () {
      if (this.$q.localStorage.has('__diyup__signedIn')) {
        this.$router.push({ path: '/post' }).catch(() => false)
      }
    }
  }
}
</script>

<style lang="stylus">
// .my-table-details {
//   font-size: 0.85em;
//   font-style: italic;
//   max-width: 200px;
//   white-space: normal;
//   color: #555;
//   margin-top: 4px;
// }
</style>
