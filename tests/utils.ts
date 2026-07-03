import { mount, MountingOptions } from '@vue/test-utils'
import vuetify from '@renderer/plugins/vuetify'

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
