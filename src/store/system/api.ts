import { GLOBAL_NAMESPACE, UI_NAMESPACE } from '@/helpers/const';
import { createApi } from '@/plugins/database/api';
import { StoreObject } from '@/shared-types';

import { SystemConfig, UserUnits } from './types';

export const configApi = createApi<SystemConfig & StoreObject>({
  namespace: `${UI_NAMESPACE}:system-config`,
});

// For now, the only thing stored in the global namespace are user units
export const globalApi = createApi<UserUnits & StoreObject>({
  namespace: GLOBAL_NAMESPACE,
});
