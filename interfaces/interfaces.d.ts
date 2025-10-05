interface Drink {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface New {
  id: number;
  name: string;
  date: number;
  text: string;
  imageUrl: string;
}

interface Event {
  id: number;
  name: string;
  date: number;
  price: number;
  text: string;
  imageUrl: string;
}

type NewsItem = New;