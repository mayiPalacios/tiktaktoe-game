import usePreviousValue from "./usePreviousValue";

const useTimeMachine = <T>(index: T) => {
  const previousvalue = usePreviousValue<T>(index);

  const getPreviousValue = () => previousvalue[previousvalue.length - 1];

  return {
    previousvalue,
    getPreviousValue,
  };
};

export default useTimeMachine;
