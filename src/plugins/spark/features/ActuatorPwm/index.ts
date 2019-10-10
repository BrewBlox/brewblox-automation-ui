import { unitDurationString } from '@/helpers/functional';
import { Link, Unit } from '@/helpers/units';
import GenericBlock from '@/plugins/spark/components/GenericBlock';
import { Feature } from '@/store/features';

import { interfaceTypes } from '../../block-types';
import { blockWidgetSelector } from '../../helpers';
import { BlockSpec } from '../../types';
import widget from './ActuatorPwmWidget.vue';
import { typeName } from './getters';
import { ActuatorPwmData } from './types';

const block: BlockSpec = {
  id: typeName,
  generate: (): ActuatorPwmData => ({
    actuatorId: new Link(null, interfaceTypes.ActuatorDigital),
    drivenActuatorId: new Link(null, interfaceTypes.ActuatorDigital, true),
    period: new Unit(4, 'second'),
    desiredSetting: 0,
    setting: 0,
    value: 0,
    constrainedBy: { constraints: [] },
    enabled: true,
  }),
  presets: [
    {
      name: 'Heater - 4s period',
      generate: () => ({
        period: new Unit(4, 'second'),
      }),
    },
    {
      name: 'Fridge - 30m period',
      generate: () => ({
        period: new Unit(1800, 'second'),
      }),
    },
  ],
  changes: [
    {
      key: 'desiredSetting',
      title: 'Duty Setting',
      component: 'NumberValEdit',
      generate: () => 0,
    },
    {
      key: 'period',
      title: 'Period',
      component: 'UnitValEdit',
      generate: () => new Unit(4, 'second'),
      pretty: unitDurationString,
    },
    {
      key: 'enabled',
      title: 'Enabled',
      component: 'BoolValEdit',
      generate: () => true,
    },
    {
      key: 'actuatorId',
      title: 'Target',
      component: 'LinkValEdit',
      generate: () => new Link(null, interfaceTypes.ActuatorDigital),
    },
  ],
  graphTargets: {
    setting: 'Duty Setting',
    value: 'Duty Achieved',
  },
};

const feature: Feature = {
  ...GenericBlock,
  id: typeName,
  displayName: 'PWM',
  role: 'Output',
  widgetComponent: blockWidgetSelector(widget),
  widgetSize: {
    cols: 4,
    rows: 3,
  },
};

export default { feature, block };
