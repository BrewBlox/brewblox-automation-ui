import sparkStore from '@/plugins/spark/store';
import { ActuatorPwmBlock } from './state';
import { ActuatorDigitalLink } from '@/helpers/units/KnownLinks';
import { Unit } from '@/helpers/units';

export const typeName = 'ActuatorPwm';

export const getById =
  (serviceId: string, id: string): ActuatorPwmBlock =>
    sparkStore.blockById(serviceId, id, typeName);

export const defaultData =
  (): any => ({
    actuatorId: new ActuatorDigitalLink(null),
    period: new Unit(4, 'second'),
    setting: 0,
    constrainedBy: { constraints: [] },
    enabled: true,
  });

export const presets =
  (): any[] => ([
    {
      label: 'Heater - 4s period',
      value: {
        period: new Unit(4, 'second'),
      },
    },
    {
      label: 'Fridge - 30m period',
      value: {
        period: new Unit(1800, 'second'),
      },
    },
  ]);
