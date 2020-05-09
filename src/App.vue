<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="stylus">
.App {
  margin: 2vh auto;
  width: 90vw;
  max-width: 500px;
}

.i-card {
  border: solid $grey-4 1px;
  border-radius: 4px;
}

.i-btn-1 {
  width: 55vw;
  max-width: 250px;
}

.i-btn-2 {
  width: 75vw;
  max-width: 450px;
}

.text-underline {
  text-decoration: underline;
}

// /* Hide scrollbar for Chrome, Safari and Opera */
// .example::-webkit-scrollbar {
//   display: none;
// }

// /* Hide scrollbar for IE and Edge */
// .example {
//   -ms-overflow-style: none;
// }

// Scrollbar width for horizontal and vertical scrollbars
div::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

// Scrollbar track's color and width
div::-webkit-scrollbar-track {
  background: #ddd;
  border-radius: 2px;
}

// Scrollbar color
div::-webkit-scrollbar-thumb {
  background: $primary;
  border-radius: 3px;
}
</style>
