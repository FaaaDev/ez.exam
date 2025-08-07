import type { UserData } from "@/lib/api/users";
import { createSlice } from "@reduxjs/toolkit";

type Stats = {
  label: string;
  value: number;
  color: string;
};

type UserSlice = {
  isLoading: boolean;
  profile?: UserData | null;
  stats: Stats[];
};

const initialState: UserSlice = {
  isLoading: true,
  profile: null,
  stats: [],
};

const userSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {
    setProfile(state, { payload }) {
      state.profile = payload;
    },
    setStat(state, { payload }: { payload: Stats[] }) {
      state.stats = payload;
    },
    setLoadingUser(state, { payload }) {
      state.isLoading = payload;
    },
  },
});

export const { setProfile, setStat, setLoadingUser } = userSlice.actions;
export default userSlice.reducer;
