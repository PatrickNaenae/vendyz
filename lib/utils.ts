import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: "NGN" | "EUR" | "GBP" | "USD";
    notation?: Intl.NumberFormatOptions["notation"];
  } = {}
) {
  const { currency = "NGN", notation = "standard" } = options;

  const numericPrice = typeof price === "string" ? parseFloat(price) : price;

  if (isNaN(numericPrice) || !isFinite(numericPrice)) {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency,
      notation,
      maximumFractionDigits: 2,
    }).format(0);
  }

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice);
}

export const formatDateTime = (dateString: string | null | undefined) => {
  try {
    const date = dateString ? parseISO(dateString) : null;
    if (!date) {
      throw new Error("Invalid date format");
    }
    return format(date, "MMM dd, yyyy • hh:mm a");
  } catch (error) {
    return `Invalid date format ${error}`;
  }
};

export const capitalize = (str: string | null | undefined) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const getPaginationGenerator = (
  currentPageNumber: number,
  totalPageNumber: number,
  offset = 2
): (number | string)[] => {
  const offsetNumber =
    currentPageNumber <= offset || currentPageNumber > totalPageNumber - offset
      ? offset
      : offset - 1;
  const numbersList: number[] = [];
  const numbersListWithDots: (number | string)[] = [];

  if (totalPageNumber <= 1 || totalPageNumber === undefined) return [1];

  numbersList.push(1);
  for (
    let i = currentPageNumber - offsetNumber;
    i <= currentPageNumber + offsetNumber;
    i++
  ) {
    if (i < totalPageNumber && i > 1) {
      numbersList.push(i);
    }
  }
  numbersList.push(totalPageNumber);

  numbersList.reduce((accumulator, currentValue) => {
    if (accumulator === 1) {
      numbersListWithDots.push(accumulator);
    }
    if (currentValue - accumulator !== 1) {
      numbersListWithDots.push("...");
    }
    numbersListWithDots.push(currentValue);

    return currentValue;
  });

  return numbersListWithDots;
};
