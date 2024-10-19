import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

// ---- 1. Megosztott adatok típusának definiálása ----
interface TimerContextType {
  showTimeInput: boolean;
  setShowTimeInput: Dispatch<SetStateAction<boolean>>;
  inputTime: number;
  setInputTime: Dispatch<SetStateAction<number>>;
}

// ---- 2. Context létrehozása ----
const TimerContext = createContext<TimerContextType | undefined>(undefined);

// ---- 3. Context használata ----
export const useTimerContext = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimerContext must be used within a TimerProvider");
  }
  return context;
};

// ---- 4. Provider komponens definiálása ----
const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [showTimeInput, setShowTimeInput] = useState<boolean>(true);
  const [inputTime, setInputTime] = useState<number>(0);

  return (
    <TimerContext.Provider
      value={{ showTimeInput, setShowTimeInput, inputTime, setInputTime }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export default TimerProvider;
