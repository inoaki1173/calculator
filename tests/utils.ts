import { mount, MountingOptions } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives
})

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-explicit-any
export function mountWithVuetify(component: any, options: MountingOptions<any> = {}) {
  return mount(component, {
    ...options,
    global: {
      plugins: [vuetify],
      ...options.global
    }
  })
}
