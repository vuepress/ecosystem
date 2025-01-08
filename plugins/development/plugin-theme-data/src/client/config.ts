import { setupDevtoolsPlugin } from '@vue/devtools-api'
import { computed, watch } from 'vue'
import type { ClientData } from 'vuepress/client'
import { clientDataSymbol, defineClientConfig } from 'vuepress/client'
import {
  resolveThemeLocaleData,
  themeLocaleDataSymbol,
  useThemeData,
} from './composables/index.js'

const PLUGIN_ID = 'org.vuejs.vuepress.plugin-theme-data'
const PLUGIN_LABEL = 'VuePress Theme Data'
const PLUGIN_COMPONENT_STATE_TYPE = PLUGIN_LABEL
const INSPECTOR_ID = 'org.vuejs.vuepress'
const INSPECTOR_LABEL = 'VuePress'
const INSPECTOR_CLIENT_DATA_ID = 'client-data'
const INSPECTOR_CLIENT_DATA_LABEL = 'Client Data'

export default defineClientConfig({
  enhance({ app }) {
    // provide theme data & theme locale data
    const themeData = useThemeData()
    const clientData = app._context.provides[
      clientDataSymbol as unknown as symbol
    ] as ClientData
    const themeLocaleData = computed(() =>
      resolveThemeLocaleData(themeData.value, clientData.routeLocale.value),
    )
    app.provide(themeLocaleDataSymbol, themeLocaleData)

    Object.defineProperties(app.config.globalProperties, {
      $theme: {
        get() {
          return themeData.value
        },
      },
      $themeLocale: {
        get() {
          return themeLocaleData.value
        },
      },
    })

    // setup devtools in dev mode
    if (__VUEPRESS_DEV__ || __VUE_PROD_DEVTOOLS__) {
      setupDevtoolsPlugin(
        {
          // fix recursive reference
          app: app as never,
          id: PLUGIN_ID,
          label: PLUGIN_LABEL,
          packageName: '@vuepress/plugin-theme-data',
          homepage: 'https://vuepress.vuejs.org',
          logo: 'https://vuepress.vuejs.org/images/hero.png',
          componentStateTypes: [PLUGIN_COMPONENT_STATE_TYPE],
        },
        (api) => {
          api.on.inspectComponent((payload) => {
            payload.instanceData.state.push(
              {
                type: 'VuePress',
                key: 'themeData',
                editable: false,
                value: themeData.value,
              },
              {
                type: 'VuePress',
                key: 'themeLocaleData',
                editable: false,
                value: themeLocaleData.value,
              },
            )
          })

          // setup custom inspector
          api.addInspector({
            id: INSPECTOR_ID,
            label: INSPECTOR_LABEL,
            icon: 'article',
          })
          api.on.getInspectorTree((payload) => {
            if (payload.inspectorId !== INSPECTOR_ID) return

            payload.rootNodes
              .find((item) => item.id === INSPECTOR_CLIENT_DATA_ID)
              ?.children!.push(
                {
                  id: 'themeData',
                  label: 'themeData',
                },
                {
                  id: 'themeLocaleData',
                  label: 'themeLocaleData',
                },
              )
          })

          api.on.getInspectorState((payload) => {
            if (payload.inspectorId !== INSPECTOR_ID) return

            if (payload.nodeId === INSPECTOR_CLIENT_DATA_ID) {
              payload.state[INSPECTOR_CLIENT_DATA_LABEL].push(
                {
                  key: 'themeData',
                  value: themeData.value,
                },
                {
                  key: 'themeLocaleData',
                  value: themeLocaleData.value,
                },
              )
            }

            if (['themeData', 'themeLocaleData'].includes(payload.nodeId)) {
              payload.state = {
                [INSPECTOR_CLIENT_DATA_LABEL]: [
                  {
                    key: payload.nodeId,
                    value:
                      payload.nodeId === 'themeData'
                        ? themeData.value
                        : themeLocaleData.value,
                  },
                ],
              }
            }
          })

          // refresh the component state and inspector state
          watch([themeData, themeLocaleData], () => {
            api.notifyComponentUpdate()
            api.sendInspectorState(INSPECTOR_ID)
          })
        },
      )
    }
  },
})
