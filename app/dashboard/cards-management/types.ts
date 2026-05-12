export type Message = {
  text: string;
  textConfigId: number;
  slogans: string[];
};

export type MoodData = {
  messages: Message[];
  imageUrls: string[];
};

export type TimeOfDayData = {
  moods: Record<string, MoodData>;
};

export type GreetingJson = Record<string, TimeOfDayData>;
