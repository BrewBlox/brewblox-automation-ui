import { genericBlockFeature } from '@/plugins/spark/generic';
import { userUnitChoices } from '@/plugins/spark/getters';
import { blockWidgetSelector } from '@/plugins/spark/helpers';
import { BlockSpec, TempSensorMockBlock } from '@/plugins/spark/types';
import { Unit } from '@/plugins/spark/units';
import { WidgetFeature } from '@/store/features';

import widget from './TempSensorMockWidget.vue';

const typeName = 'TempSensorMock';

const block: BlockSpec<TempSensorMockBlock> = {
  id: typeName,
  generate: () => ({
    value: new Unit(20, 'degC'),
    setting: new Unit(20, 'degC'),
    fluctuations: [],
    connected: true,
  }),
  fields: [
    {
      key: 'setting',
      title: 'Sensor Setting',
      component: 'UnitValEdit',
      componentProps: { units: userUnitChoices.Temp },
      generate: () => new Unit(20, 'degC'),
    },
    {
      key: 'connected',
      title: 'Connected',
      component: 'BoolValEdit',
      generate: () => true,
    },
    {
      key: 'value',
      title: 'Sensor value',
      component: 'UnitValEdit',
      componentProps: { units: userUnitChoices.Temp },
      generate: () => new Unit(20, 'degC'),
      readonly: true,
      graphed: true,
    },
  ],
};

const feature: WidgetFeature = {
  ...genericBlockFeature,
  id: typeName,
  title: 'Temp Sensor (Mock)',
  role: 'Process',
  component: blockWidgetSelector(widget, typeName),
  widgetSize: {
    cols: 4,
    rows: 3,
  },
};

export default { feature, block };
