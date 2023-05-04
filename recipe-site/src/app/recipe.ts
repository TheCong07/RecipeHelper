export interface Recipe{
    recipeID: string;
    image: string;
    name:string;
    ingredients:Array<string>;
    steps:Array<string>;
    source: string;
}