import moment from "moment";
import { v4 } from "uuid";
export const generateUuid = () => v4();

type ParseFormDataOptions = {
  preserveUndefined?: boolean;
  preserveNull?: boolean;
  preserveEmptyStrings?: boolean;
};
export const parseFormData = <T extends Object>(
  formData: T,
  options: ParseFormDataOptions = {
    preserveEmptyStrings: false,
    preserveNull: false,
    preserveUndefined: false,
  }
): Partial<T> => {
  const parsedFormData = { ...formData };

  Object.keys(parsedFormData).forEach((key) => {
    const value = parsedFormData[key as keyof T];

    if (
      (value === undefined && !options.preserveUndefined) ||
      (value === null && !options.preserveNull) ||
      (value === "" && !options.preserveEmptyStrings)
    ) {
      delete parsedFormData[key as keyof T];
    }
  });

  return parsedFormData;
};

export const assertFormDataFields = <T extends Object>(
  formData: T,
  fields: Array<keyof T>
) => {
  return fields.every((key) => key in formData && !!formData?.[key]);
};

export const parseDateToAPI = (date: Date | null) => {
  if (!date) return undefined;

  const dateParts = date?.toISOString()?.split("T");

  return [dateParts?.[0], dateParts?.[1]?.slice(0, 8)].join(" ");
};

export const parseStringToDate = (dateStr: string | null | undefined) => {
  if (!dateStr) return null;

  return moment(dateStr);
};

export const convertDateToString = (date: Date) => {
  if (Number.isNaN(date.getTime())) return "";

  const day = date.getDate().toLocaleString("pt-BR", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  const month = (date.getMonth() + 1).toLocaleString("pt-BR", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  const year = date.getFullYear().toLocaleString("pt-BR", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  return `${day}/${month}/${year}`;
};

export const convertDateToDateStringAPI = (date: Date | null) => {
  if (!date) return date;

  return `${date.getFullYear().toString()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
};

export const convertAPIDateStringToDate = (dateString: string) => {
  return new Date(`${dateString?.split("T")?.[0]}T00:00:00.000`);
};

export const convertNumberToMoneyFormat = (value: number) => {
  const moneyFormat = Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return moneyFormat;
};
