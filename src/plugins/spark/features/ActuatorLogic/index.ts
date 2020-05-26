import { genericBlockFeature } from '@/plugins/spark/generic';
import { interfaceTypes } from '@/plugins/spark/getters';
import { blockWidgetSelector } from '@/plugins/spark/helpers';
import { BlockSpec } from '@/plugins/spark/types';
import { Link } from '@/plugins/spark/units';
import { WidgetFeature } from '@/store/features';

import widget from './ActuatorLogicWidget.vue';
import { ActuatorLogicBlock, EvalResult } from './types';

const typeName = 'ActuatorLogic';

const block: BlockSpec<ActuatorLogicBlock> = {
  id: typeName,
  generate: () => ({
    enabled: true,
    result: EvalResult.EMPTY,
    errorPos: 0,
    targetId: new Link(null, interfaceTypes.ActuatorDigital),
    drivenTargetId: new Link(null, interfaceTypes.ActuatorDigital, true),
    analog: [],
    digital: [],
    expression: '',
  }),
  fields: [
    {
      key: 'result',
      title: 'Result',
      component: 'NumberValEdit',
      generate: () => EvalResult.TRUE,
      readonly: true,
      graphed: true,
    },
  ],
};

const feature: WidgetFeature = {
  ...genericBlockFeature,
  id: typeName,
  title: 'Logic Actuator',
  role: 'Control',
  component: blockWidgetSelector(widget, typeName),
  widgetSize: {
    cols: 4,
    rows: 3,
  },
};

export default { feature, block };
