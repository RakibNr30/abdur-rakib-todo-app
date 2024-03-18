import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";
import * as storages from "../constants/storages";

const useStorageStore = create(
    persist(
        (set, get) => ({
            storage: storages.TYPE.LOCAL,
            setStorage: (type) => {
                set({storage: type})
            },
            getStorage: () => {
                return get().storage;
            }
        }),
        {
            name: 'storage_type',
            storage: createJSONStorage(() => localStorage),
        },
    )
);

export default useStorageStore;