import Vue from 'vue';
import providerStore from '@/store/providers';
import { autoRegister } from '@/helpers/component-ref';
import featureStore from '@/store/features';
import sparkStore from '@/plugins/spark/store';
import {
  base64ToHex,
  durationString,
  hexToBase64,
  unitDurationString,
  shortDateString,
  dateString,
  round,
  truncate,
} from '@/helpers/functional';
import { Link, Unit } from '@/helpers/units';
import { Service } from '@/store/services/state';
import features from './features';
import arrangements from './arrangements';


const onAdd = async (service: Service): Promise<void> => {
  await sparkStore.addService(service.id);
  await sparkStore.fetchServiceStatus(service.id);
  await Promise.all([
    sparkStore.createUpdateSource(service.id),
    sparkStore.fetchDiscoveredBlocks(service.id),
  ]);
};

const onRemove = async (service: Service): Promise<void> => {
  const source = sparkStore.updateSource(service.id);
  await sparkStore.removeService(service.id);
  if (source) {
    source.close();
  }
};

export default () => {
  autoRegister(require.context('./components', true, /[A-Z]\w+\.vue$/));
  autoRegister(require.context('./provider', true, /[A-Z]\w+\.vue$/));

  Vue.filter(
    'unit',
    (value: Unit | null) =>
      (value !== null && value !== undefined ? value.toString() : '-'));
  Vue.filter(
    'link',
    (value: Link | null) =>
      (value !== null && value !== undefined ? value.toString() : '-'));
  Vue.filter('round', round);
  Vue.filter('hexToBase64', hexToBase64);
  Vue.filter('base64ToHex', base64ToHex);
  Vue.filter('duration', durationString);
  Vue.filter('truncated', truncate);
  Vue.filter('unitDuration', unitDurationString);
  Vue.filter('dateString', dateString);
  Vue.filter('shortDateString', shortDateString);

  Object.values(features)
    .forEach(feature => featureStore.createFeature(feature));

  Object.values(arrangements)
    .forEach(arr => featureStore.createArrangement(arr));

  providerStore.createProvider({
    id: 'Spark',
    displayName: 'Spark Controller',
    features: Object.keys(features),
    onAdd: onAdd,
    onRemove: onRemove,
    onFetch: (service: Service) => sparkStore.fetchAll(service.id),
    wizard: 'SparkWizard',
    page: 'SparkPage',
    watcher: 'SparkWatcher',
  });
};
