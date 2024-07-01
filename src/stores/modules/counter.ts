export const useCounterStore = defineStore('counter', () => {
  const count = useStorage('count', 0)

  return { count }
})
