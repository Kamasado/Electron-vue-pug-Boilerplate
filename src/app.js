// CSS
import './stylesheets/main.css'
import './stylesheets/materialize.min.css'

// Helpers
import './helpers/context_menu.js'
import './helpers/external_links.js'
import './helpers/title_bar.js'

// Vue imports
import Vue from "./modules/vue.js"
/**/ // Components
/**/ import Main from "./components/Main.vue"

// ---------------
// Main page code.
// ---------------

new Vue({
  el: '#app',
  template:
    '<Main/>',
  components: { Main }
})
