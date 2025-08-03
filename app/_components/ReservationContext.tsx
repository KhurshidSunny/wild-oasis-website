"use client";

import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

export type RangeType = {
  from: Date | undefined;
  to?: Date | undefined;
};

type ReservationContextType = {
  range: RangeType;
  setRange: React.Dispatch<React.SetStateAction<RangeType>>;
  resetRange: () => void;
};

const ReservationContext = createContext<ReservationContextType | undefined>(
  undefined
);

const initialState: RangeType = {
  from: undefined,
  to: undefined,
};

function ReservationProvider({ children }: PropsWithChildren) {
  const [range, setRange] = useState(initialState);

  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error("The Reservation Context is access outside the Provider");
  }
  return context;
}

export { ReservationProvider, useReservation };
