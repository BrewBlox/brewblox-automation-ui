import { genericBlockFeature } from '@/plugins/spark/generic';
import { blockWidgetSelector, prettifyConstraints } from '@/plugins/spark/helpers';
import { BlockSpec, DigitalState } from '@/plugins/spark/types';
import { Link, Unit } from '@/plugins/spark/units';
import { WidgetFeature } from '@/store/features';

import widget from './DigitalActuatorWidget.vue';
import { DigitalActuatorBlock } from './types';

const seconds = (v = 0): Unit => new Unit(v, 'seconds');
const typeName = 'DigitalActuator';

const block: BlockSpec<DigitalActuatorBlock> = {
  id: typeName,
  generate: () => ({
    hwDevice: new Link(null, 'IoArrayInterface'),
    channel: 0,
    desiredState: DigitalState.Inactive,
    state: DigitalState.Inactive,
    invert: false,
    constrainedBy: { constraints: [] },
  }),
  presets: [
    {
      name: 'Fridge cooler (compressor)',
      generate: () => ({
        invert: false,
        constrainedBy: {
          constraints: [
            {
              minOff: seconds(300),
              remaining: seconds(),
            },
            {
              minOn: seconds(180),
              remaining: seconds(),
            },
            {
              mutexed: {
                mutexId: new Link(null, 'MutexInterface'),
                extraHoldTime: seconds(),
                hasCustomHoldTime: true,
                hasLock: false,
              },
              remaining: seconds(),
            },
          ],
        },
      }),
    },
    {
      name: 'Fridge heater',
      generate: () => ({
        invert: false,
        constrainedBy: {
          constraints: [
            {
              mutexed: {
                mutexId: new Link(null, 'MutexInterface'),
                extraHoldTime: seconds(),
                hasCustomHoldTime: true,
                hasLock: false,
              },
              remaining: seconds(),
            },
          ],
        },
      }),
    },
  ],
  fields: [
    {
      key: 'desiredState',
      title: 'State',
      component: 'StateValEdit',
      generate: () => 0,
      pretty: v => DigitalState[v],
      graphed: true,
      graphName: 'Desired state',
    },
    {
      key: 'invert',
      title: 'Invert',
      component: 'BoolValEdit',
      generate: () => false,
    },
    {
      key: 'constrainedBy',
      title: 'Constraints',
      component: 'DigitalConstraintsValEdit',
      generate: () => ({ constraints: [] }),
      pretty: prettifyConstraints,
    },
    {
      key: 'state',
      title: 'Actual state',
      component: 'StateValEdit',
      generate: () => 0,
      pretty: v => DigitalState[v],
      readonly: true,
      graphed: true,
    },
  ],
};

const feature: WidgetFeature = {
  ...genericBlockFeature,
  id: typeName,
  title: 'Digital Actuator',
  role: 'Output',
  component: blockWidgetSelector(widget, typeName),
  widgetSize: {
    cols: 4,
    rows: 2,
  },
};

export default { feature, block };
