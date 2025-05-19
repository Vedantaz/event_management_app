export enum ROLES {
  USER = "USER",
  ADMIN = "ADMIN",
}

export enum STATUS {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export enum SortBy {
  POPULARITY = "popularity",
  DATE = "date",
  PRICE = "price",
  RATING = "rating",
}

export enum ReviewSortBy {
  RATING = "rating",
}

export enum OrderBy {
  ASC = "asc",
  DESC = "desc",
}

export enum BookingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
}

export enum CancelStatus {
  PROCESSING = "PROCESSING",
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}
