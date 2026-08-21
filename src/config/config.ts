export default class config {
  public static readonly API_BASE_URL: string = import.meta.env
    .VITE_API_BASE_URL as string;
}
