function formatPrice(price: number): string {
    return `$${price.toLocaleString()}`;
}

function formatMileageKm(mileage: number): string {
    return `${mileage.toLocaleString()}km`;
}

function formatDisplacement(displacement: number): string {
    return displacement === 0 
        ? "" 
        : `${displacement.toFixed(1)}L`;
}

function formatPowerKw(powerInHp: number): string {
    return `${(powerInHp * 0.7457).toFixed(0)}`;
}

function formatPowerHpAndKw(power: number): string {
    return `${power} HP (${formatPowerKw(power)} kw)`;
}

function formatTorqueNm(torque: number): string {
    return `${torque} Nm`
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}.${month}.${day}`;
}

function formatDateTime(date: Date): string {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
}

function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export { 
    formatPrice, 
    formatMileageKm, 
    formatDisplacement, 
    formatPowerKw, 
    formatPowerHpAndKw, 
    formatTorqueNm, 
    formatDate, 
    formatDateTime,
    capitalize,
};