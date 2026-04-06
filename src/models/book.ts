export class Book {
   id: number;
   title: string;
   author: string;
   year: string;
   isBorrowed: boolean;
   constructor(id: number, title: string, author: string, year: string) {
            this.id = id;
            this. title = title;
            this.author = author;
            this.year = year;
            this.isBorrowed = false;
   }
}