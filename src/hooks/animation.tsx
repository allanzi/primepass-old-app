import React, {
  createContext, useState, useContext, useCallback,
} from 'react';

interface AnimationState {
  currentScrollYPosition: number;
}

interface AnimationContextState {
  animation: AnimationState;
  setScrollPosition(position: AnimationState): void;
}

const AnimationContext = createContext<AnimationContextState>({} as AnimationContextState);

const AnimationProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AnimationState>({} as AnimationState);

  const setScrollPosition = useCallback((position: AnimationState) => {
    setData({ ...data, ...position });
  }, []);

  return (
    <AnimationContext.Provider
      value={{
        animation: data,
        setScrollPosition,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
};

function useAnimation(): AnimationContextState {
  const context = useContext(AnimationContext);

  if (!context) {
    throw new Error('useAnimation should be used with an AnimationProvider');
  }

  return context;
}

export { useAnimation, AnimationProvider };
