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

function formatPowerHp(power: number): string {
    return `${(power*1.34102).toFixed(0)}`;
}

function formatPowerKwAndHp(power: number): string {
    return `${power} kW (${formatPowerHp(power)} HP)`;
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

export { formatPrice, formatMileageKm, formatDisplacement, formatPowerHp, formatPowerKwAndHp, formatTorqueNm, formatDate };