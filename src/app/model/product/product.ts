import { Category } from "../category/category";

export class Product {
    id: string;
    title: string;
    price: number;
    description: string;
    category: Category;
    images: string[];
    imagesInput: string; // New property for textarea input

    constructor() {
        this.id = '';
        this.title = '';
        this.price = 0;
        this.description = '';
        this.category = new Category();
        this.images = [];
        this.imagesInput = ''; // Initialize the new property
    }
}
