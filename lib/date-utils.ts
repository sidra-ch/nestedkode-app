import jalaali from 'jalaali-js';

/**
 * Converts a Gregorian date string or Date object to Jalaali (Solar Hijri) components.
 */
export function toJalaali(dateInput: string | Date) {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return null;

    const { jy, jm, jd } = jalaali.toJalaali(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
    );
    return { year: jy, month: jm, day: jd };
}

/**
 * Formats a date string or Date object into a dual-format string: 
 * "DD Month YYYY (Jan DD, YYYY)"
 * Using Afghanistan Solar Hijri month names.
 */
export function formatDualDate(dateInput: string | Date | null | undefined): string {
    if (!dateInput) return "";
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return String(dateInput);

    const j = toJalaali(date);
    if (!j) return String(dateInput);

    // Afghanistan Solar Hijri Month Names
    const months = [
        "حمل", "ثور", "جوزا", "سرطان", "اسد", "سنبله",
        "میزان", "عقرب", "قوس", "جدی", "دلو", "حوت"
    ];

    const jStr = `${j.day} ${months[j.month - 1]} ${j.year}`;

    const gStr = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    return `${jStr} (${gStr})`;
}

/**
 * Formats just the Jalaali part
 */
export function formatJalaaliDate(dateInput: string | Date): string {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return "";
    const j = toJalaali(date);
    if (!j) return "";

    const months = [
        "حمل", "ثور", "جوزا", "سرطان", "اسد", "سنبله",
        "میزان", "عقرب", "قوس", "جدی", "دلو", "حوت"
    ];

    return `${j.day} ${months[j.month - 1]} ${j.year}`;
}
