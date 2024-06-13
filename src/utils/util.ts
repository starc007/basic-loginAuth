/* eslint-disable @typescript-eslint/no-explicit-any */
export function debounce(
  func: (...args: any[]) => any,
  wait: number,
  immediate?: boolean
): (...args: any[]) => void {
  // 'private' variable for instance
  // The returned function will be able to reference this due to closure.
  // Each call to the returned function will share this common timer.
  let timeout: ReturnType<typeof setTimeout> | null;

  // Calling debounce returns a new anonymous function
  return function (this: any, ...args) {
    // reference the context and args for the setTimeout function
    // eslint-disable-next-line consistent-this, @typescript-eslint/no-this-alias
    const context = this;

    // Should the function be called now? If immediate is true
    //   and not already in a timeout then the answer is: Yes
    const callNow = immediate && !timeout;

    // This is the basic debounce behaviour where you can call this
    //   function several times, but it will only execute once
    //   [before or after imposing a delay].
    //   Each time the returned function is called, the timer starts over.
    if (timeout) {
      clearTimeout(timeout);
    }
    // Set the new timeout
    timeout = setTimeout(() => {
      // Inside the timeout function, clear the timeout variable
      // which will let the next execution run when in 'immediate' mode
      timeout = null;

      // Check if the function already ran with the immediate flag
      if (!immediate) {
        // Call the original function with apply
        // apply lets you define the 'this' object as well as the arguments
        //    (both captured before setTimeout)
        func.apply(context, args);
      }
    }, wait);

    // Immediate mode and no wait timer? Execute the function..
    if (callNow) {
      func.apply(context, args);
    }
  };
}

export const searchFilter = (
  searchVal: string,
  name: string,
  location?: string,
  email?: string
): boolean => {
  return (
    name.toLowerCase().includes(searchVal.toLowerCase()) ||
    (location
      ? location.toLowerCase().includes(searchVal.toLowerCase())
      : false) ||
    (email ? email.toLowerCase().includes(searchVal.toLowerCase()) : false)
  );
};
