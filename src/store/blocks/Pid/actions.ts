import { updateBlockState } from '../mutations';
import { PidBlock } from '@/store/blocks/Pid/Pid';

import { RootStore } from '@/store/state';

// example refresh action
export const refresh = (store: RootStore, pid: PidBlock) => {
  function random() {
    return Math.round(Math.random() * 100);
  }

  // assign new random state
  updateBlockState(store, {
    ...pid,
    data: {
      settings: pid.data.settings,
      links: pid.data.links,
      filtering: pid.data.filtering,
      state: {
        inputValue: random(),
        inputSetting: random(),
        outputValue: random(),
        outputSetting: random(),
        p: random(),
        i: random(),
        d: random(),
        derivative: random(),
        integral: random(),
        error: random(),
      },
    },
  });
};