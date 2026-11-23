export const STATS = [
  { value: "800°F", label: "oven temperature" },
  { value: "90 sec", label: "average pizza bake" },
  { value: "noon", label: "pasta rolled daily" },
] as const

export const HOURS = [
  { day: "Wed", open: "5:00 PM", close: "9:30 PM" },
  { day: "Thu", open: "5:00 PM", close: "10:00 PM" },
  { day: "Fri", open: "5:00 PM", close: "11:00 PM" },
  { day: "Sat", open: "4:30 PM", close: "11:00 PM" },
  { day: "Sun", open: "4:30 PM", close: "9:30 PM" },
  { day: "Mon-Tue", open: "Closed" },
] as const
