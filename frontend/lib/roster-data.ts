export type Shift = "M" | "A" | "O" | "L";

export interface RosterEmployee {
  id: string;
  name: string;
  role: "L1" | "L2";
  shifts: Shift[];
}

export const month = "July 2026";

export const days = Array.from({ length: 31 }, (_, i) => i + 1);

export const rosterEmployees: RosterEmployee[] = [
  {
    id: "L1001",
    name: "Aman Sharma",
    role: "L1",
    shifts: [
      "M","M","A","A","O","O","M",
      "M","A","A","M","O","O","A",
      "A","M","M","A","O","O","M",
      "M","A","A","M","O","O","M",
      "A","M","A"
    ]
  },

  {
    id: "L1002",
    name: "Sara Khan",
    role: "L1",
    shifts: [
      "A","A","M","O","O","M","M",
      "A","A","M","A","A","O","O",
      "M","M","A","A","M","O","O",
      "M","M","A","A","M","O","O",
      "M","M","A"
    ]
  },

  {
    id: "L2001",
    name: "John D'Souza",
    role: "L2",
    shifts: [
      "M","O","M","M","A","A","M",
      "M","O","O","A","A","M","M",
      "A","O","O","M","M","A","A",
      "M","O","O","M","A","M","M",
      "A","A","M"
    ]
  },

  {
    id: "L2002",
    name: "Fatima Sheikh",
    role: "L2",
    shifts: [
      "A","M","M","O","O","A","A",
      "M","M","A","O","O","M","M",
      "A","A","M","O","O","M","A",
      "A","M","M","O","O","A","A",
      "M","M","A"
    ]
  },

  {
    id: "L1003",
    name: "Rahul Patil",
    role: "L1",
    shifts: [
      "M","M","M","A","A","O","O",
      "M","M","A","A","M","O","O",
      "M","A","A","M","M","O","O",
      "A","A","M","M","O","O","M",
      "A","A","M"
    ]
  }
];