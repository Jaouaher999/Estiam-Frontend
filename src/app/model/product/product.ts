export class Product {
    id: string;
    title: string;
    price: number;
    description: string;
    categoryId: number;
    images: string[];

    constructor() {
        this.id = '';
        this.title = '';
        this.price = 0;
        this.description = '';
        this.categoryId = 0;
        this.images = [];
    }
}
