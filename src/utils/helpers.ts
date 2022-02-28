import { currency, language } from "./data";

export function formatAmount(value: number) {
    return value
        .toLocaleString(language, {
            style: 'currency',
            currency: currency,
        })
}

export function formatDate(date: string | number | Date) {
    return Intl.DateTimeFormat(language, {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    }).format(new Date(date));
}