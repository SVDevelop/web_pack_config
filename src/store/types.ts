export interface ICurrency {
    id: string, 
    name: string,
    min_size: string
}

export interface ResponseCurrency {
    data: ICurrency[]
}