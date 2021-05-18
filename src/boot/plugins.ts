import PortalVue from 'portal-vue';
import { PluginObject, VueConstructor } from 'vue';

import automation from '@/plugins/automation';
import database from '@/plugins/database';
import eventbus from '@/plugins/eventbus';
import spark from '@/plugins/spark';
import startup from '@/plugins/startup';
import wizardry from '@/plugins/wizardry';
import store from '@/store';
import { dashboardStore } from '@/store/dashboards';
import { serviceStore } from '@/store/services';
import { systemStore } from '@/store/system';


export default async ({ Vue }: { Vue: VueConstructor }): Promise<void> => {
  // Enable the Vue devtools performance tab
  Vue.config.performance = Boolean(process.env.DEV && process.env.BLOX_PERFORMANCE);

  Vue.use(startup);
  Vue.use(database);
  Vue.use(eventbus);

  const plugins: PluginObject<any>[] = [
    PortalVue,
    wizardry,
    automation,
    history,
    spark,
  ];

  Vue.$startup.onStart(() => systemStore.start());
  Vue.$startup.onStart(() => serviceStore.start());
  Vue.$startup.onStart(() => dashboardStore.start());

  plugins.forEach(plugin => Vue.use(plugin, { store }));
};
