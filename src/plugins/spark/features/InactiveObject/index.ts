import { genericBlockFeature } from '@/plugins/spark/generic';
import { blockWidgetSelector } from '@/plugins/spark/helpers';
import { Feature } from '@/store/features';

import { typeName } from './getters';
import widget from './InactiveObjectWidget.vue';

const feature: Feature = {
  ...genericBlockFeature,
  id: typeName,
  displayName: 'Inactive Block',
  widgetComponent: blockWidgetSelector(widget),
  wizardComponent: null,
  widgetSize: {
    cols: 4,
    rows: 2,
  },
};

export default { feature };
